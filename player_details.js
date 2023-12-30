// player_details.js
// Your API Key and Sheet ID
const API_KEY = 'AIzaSyCfxg14LyZ1hrs18WHUuGOnSaJ_IJEtDQc';
const SHEET_ID = '1RmMxuj_taiFoFx9V20xa_l8E74Wg-jaKTMexCfYpCTw';
const PLAYER_SHEET_NAME = 'snookerplus';
const FRAMES_SHEET_NAME = 'Frames';
const RANK_SHEET_NAME = 'Rank';

//  NOTE NOTE NOTE: Change the Razorpay test key to your actual key
const RAZORPAY_KEY = 'rzp_test_CyDcbMd3pugIFR';


const SHEET_PLAYER_CELLS_CONSTANTS = {
    playerName: 3, // Assuming column D
    amountToPay: 7, // Assuming column G
    razorPayPaid: 58 // Assuming column BF
}

const loaderInstance = new FullScreenLoader();

function isNumber(value) {
    return typeof value === "number" && !isNaN(value);
  }

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const playerName = urlParams.get('player');
        
        if (playerName) {
            fetchPlayerInfo(playerName);
            fetchFramesInfo(playerName);
            fetchRankInfo(playerName);
            setupPayNowButton(playerName);
        } else {
            console.error('Player name not provided.');
        }
    });
}
function fetchPlayerInfo(playerName) {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: `${PLAYER_SHEET_NAME}`,
    }).then((response) => {
        const values = response.result.values;
        const playerInfo = values.find(row => row[2] === playerName); // Assuming name is in column C
        if (playerInfo) {
            displayPlayerInfo(playerInfo);
        } else {
            console.log('Player info not found.');
        }
    }, (response) => {
        console.error('Error fetching player data:', response.result.error.message);
    });
}
function fetchFramesInfo(playerName) {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: `${FRAMES_SHEET_NAME}`,
    }).then((response) => {
        const values = response.result.values;
        const framesData = values.filter(row => [row[5], row[33]].includes(playerName)); // Assuming player names are in columns F and AH
        if (framesData.length > 0) {
            displayFramesInfo(framesData, playerName);
        } else {
            console.log('No frames found for player.');
        }
    }, (response) => {
        console.error('Error fetching frames data:', response.result.error.message);
    });
}
function fetchRankInfo(playerName) {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: `${RANK_SHEET_NAME}`,
    }).then((response) => {
        const values = response.result.values;
        const rankInfo = values.find(row => row[1] === playerName); // Matching player name in column B
        if (rankInfo) {
            displayRankInfo(rankInfo);
        } else {
            console.log('Rank info not found.');
        }
    }, (response) => {
        console.error('Error fetching rank data:', response.result.error.message);
    });
}


/**
 * Retrieves the row of a player from the spreadsheet using the player's name.
 * Assumption: PlayerName is unique and can be used for identification
 *
 * @param {string} playerName - The name of the player.
 * @return {Array} - An array representing the player's information if found, otherwise undefined.
 */
function getPlayerRow(playerName) {
    return new Promise((resolve, reject) => {
      gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: SHEET_ID,
          range: `${PLAYER_SHEET_NAME}`,
        })
        .then(
          (response) => {
            const values = response.result.values;
            const playerInfo = values.find(
              (row) => row[SHEET_PLAYER_CELLS_CONSTANTS.playerName] === playerName
            );
            if (playerInfo) {
              resolve(playerInfo);
            } else {
              console.log("Player info not found.");
              resolve(null); // Resolve with null if player info is not found
            }
          },
          (response) => {
            console.error(
              "Error fetching player row:",
              response.result.error.message
            );
            reject([]);
          }
        );
    });
  }
  

  /**
   * Updates the specified player's row in the sheet with the provided data.
   *
   * @param {string} playerName - The name of the player whose row needs to be updated.
   * @param {Object} cellsToUpdate - An object containing the cells to be updated. The keys represent
   * the cell IDs and the values are the new values for those cells.
   * @return {Promise<void>} A promise that resolves once the player's row has been successfully updated.
   */
  async function updatePlayerRow(playerName, cellsToUpdate) {
    // THIS FUNCTION WILL FAIL AS OF NOW
    // GOOGLE WON'T LET US UPDATE DATA IN SHEET WITHOUT OAUTH CREDS
    // WILL NEED A SERVER TO HANDLE ALL THAT
    // OR NEED TO FIGURE SOMETHING OUT
    try {
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: `${PLAYER_SHEET_NAME}`,
      });
  
      const values = response.result.values;
      const playerRowIndex = values.findIndex(
        (row) => row[SHEET_PLAYER_CELLS_CONSTANTS.playerName] === playerName
      );
  
      if (playerRowIndex !== -1) {
        const playerInfo = values[playerRowIndex];
  
        // Update the playerInfo with the provided cellsToUpdate
        for (const cellId in cellsToUpdate) {
          if (cellsToUpdate.hasOwnProperty(cellId)) {
            const columnIndex = parseInt(cellId, 10) - 1; // Convert cellId to 0-based index
            if (columnIndex >= 0 && columnIndex < playerInfo.length) {
              playerInfo[columnIndex] = cellsToUpdate[cellId];
            } else {
              console.error(`Invalid column index: ${columnIndex}`);
            }
          }
        }
  
        // Update the sheet with the modified data
        await gapi.client.sheets.spreadsheets.values.update({
          spreadsheetId: SHEET_ID,
          range: `${PLAYER_SHEET_NAME}!A${playerRowIndex + 1}`, // Assuming data starts from row 1
          valueInputOption: "USER_ENTERED",
          resource: {
            values: [playerInfo],
          },
        });
  
        console.log("Player info updated successfully.");
        // Optionally, display the updated player info
        displayPlayerInfo(playerInfo);
      } else {
        console.log("Player info not found.");
      }
    } catch (error) {
      console.error(
        "Error updating/fetching player data:",
        error.result?.error?.message || error.message
      );
    }
  }
  



function displayPlayerInfo(playerInfo) {
    document.getElementById('playerName').innerText = playerInfo[2]; // Assuming name is in column C
    const totalMoneyElement = document.getElementById('totalMoney');
    totalMoneyElement.innerText = `Balance: ₹ ${playerInfo[6]}`; // Assuming balance is in column G
    
    // Check if balance is more than 0 and color it red
    if (parseInt(playerInfo[6]) > 0) {
        totalMoneyElement.classList.add('positive');
    } else {
        totalMoneyElement.classList.remove('positive');
    }
    
    // Check if balance is more than 2000 and display warning
    if (parseInt(playerInfo[6]) > 2000) {
        document.getElementById('warning').style.display = 'block';
    } else {
        document.getElementById('warning').style.display = 'none';
    }
}


// ... [Previous code remains the same]

function displayFramesInfo(framesData, playerName) {
    const framesContainer = document.getElementById('framesInfo');

    framesData.reverse().forEach(frame => {
        const frameElement = document.createElement('div');
        frameElement.className = 'frame-card';

        // Format the date
        const dateParts = frame[2].split("/");
        const formattedDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        const dateStr = `${formattedDate.getDate()} ${formattedDate.toLocaleString('default', { month: 'short' })}, ${formattedDate.getFullYear()}`;

        const durationStr = `${frame[3]} Min`;
        const winner = frame[5];
        const loser = frame[34];

        // Determine the opponent's name
        let opponentName = winner === playerName ? loser : winner;

        // Determine the frame card color
        if(winner === playerName) {
            frameElement.classList.add('winner');
        } else if(winner === "Rummy") {
            frameElement.classList.add('rummy');
        } else if(winner === "Tie") {
            frameElement.classList.add('tie');
        } else {
            frameElement.classList.add('loser');
        }

        // Check if the frame was a Rummy, Tie, or a regular frame
        if (opponentName === "Rummy") {
            frameElement.innerHTML = `
                <p><span class="icon">&#128197;</span>${dateStr}, <span class="icon">&#128337;</span>${durationStr}</p>
                <p>Format: Rummy</p>
            `;
        } else if (winner === "Tie") {
            // Fetch additional data for Tie
            const additionalNameM = frame[12]; // Assuming column M is at index 12
            const additionalNameN = frame[13]; // Assuming column N is at index 13

            // Determine the name to display based on additional columns M and N
            opponentName = additionalNameM === playerName ? additionalNameN : additionalNameM;

            frameElement.innerHTML = `
                <p><span class="icon">&#128197;</span>${dateStr}, <span class="icon">&#128337;</span>${durationStr}</p>
                <p>Opponent: ${opponentName}</p>
                <p>Result: Tie</p>
            `;
        } else {
            const isWinner = frame[5] === playerName;
            const currencyValue = frame[9] || "LP";
            const sPlusValue = isWinner ? frame[50] : frame[51];
            const currencyDisplay = isWinner ? `+${currencyValue}` : `-${currencyValue}`;
            const sPlusDisplay = `Coins ${sPlusValue}`;

            frameElement.innerHTML = `
                <p><span class="icon">&#128197;</span>${dateStr}, <span class="icon">&#128337;</span>${durationStr}</p>
                <p>Opponent: ${opponentName}</p>
                <p>${currencyDisplay}, ${sPlusDisplay}</p>
            `;
        }
        framesContainer.appendChild(frameElement);
    });
}

function displayRankInfo(rankInfo) {
    document.getElementById('playerRank').innerText = `Rank: ${rankInfo[0]}`; 
    document.getElementById('winRate').innerText = `Win Rate: ${rankInfo[4]}%`; 
    document.getElementById('playerCard').style.backgroundColor = rankInfo[3]; 
}

function setupPayNowButton(playerName) {
    document.getElementById('payNowButton').addEventListener('click', function() {
        const playerBalance = document.getElementById('totalMoney').innerText.replace('Balance: ₹ ', '');
        initiatePayment(playerName, playerBalance);
    });
}


/**
 * Handles the payment success for a player.
 * - Updates the player's RazorPay paid amount in the sheet.
 *
 * @param {string} playerName - The name of the player.
 * @param {number} amount - The amount of the payment.
 * @param {string} _paymentId - The ID of the payment.
 */
async function handlePaymentSuccess(playerName, amount, _paymentId) {
    try {
        loaderInstance.showLoader();

        const playerData = await getPlayerRow(playerName);

        if (!playerData) {
            // Need to handle what happens if user is missing from the sheet
            return;
        }

        const razorPayPaid = parseInt(playerData[SHEET_PLAYER_CELLS_CONSTANTS.razorPayPaid]) || 0;
        const amountPaid = razorPayPaid + amount;

        await updatePlayerRow(playerName, { [SHEET_PLAYER_CELLS_CONSTANTS.razorPayPaid]: amountPaid });

    } catch (error) {
        console.error('Error handling payment success:', error.message);
    } finally {
        loaderInstance.hideLoader();
    }
}


function initiatePayment(playerName, amount) {
    // Convert amount to a number and check if it's valid
    const paymentAmount = Number(amount);
    if (isNaN(paymentAmount) || paymentAmount <= 0) {
        alert('Invalid payment amount');
        return;
    }

    var options = {
        "key": RAZORPAY_KEY,
        "amount": paymentAmount * 100, // Convert to smallest currency unit
        "currency": "INR",
        "name": "Snooker Plus",
        "description": "Clear Player Dues",
        "handler": function(response) {
            // Handle the payment success
            // alert('Payment successful. Payment ID: ' + response.razorpay_payment_id);
            handlePaymentSuccess(playerName, paymentAmount, response.razorpay_payment_id);
        },
        "prefill": {
            "name": playerName,
            // Add other prefill information if available
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp = new Razorpay(options);
    rzp.open();
}

// Load the Google API client and call initClient
gapi.load('client', initClient);
