export const abiData = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "fareTypes",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "LeavingOn",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "returningOn",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "toWhere",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "itinerary",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "numberOfPassangers",
				"type": "uint256"
			}
		],
		"name": "FlightBookings",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "goingTo",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "numberOfGuest",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "numberOfRooms",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "purposeOfTraveling",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "checkIn",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "checkOut",
				"type": "string"
			}
		],
		"name": "HotelBookings",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balanceAddress",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "balanceWithdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "flightBookingAddresses",
		"outputs": [
			{
				"internalType": "address",
				"name": "bookingOwnerAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "flightNumber",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "paymentAmount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "flightStatus",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "seatNumber",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "fareTypes",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "LeavingOn",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "returningOn",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "toWhere",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "itinerary",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "numberOfPassangers",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "flightStatus",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hotelBookingAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "bookingOwnerAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "bookingNumber",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "checkIn",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "checkOut",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "goingTo",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "numberOfGuest",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "numberOfRooms",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "purposeOfTraveling",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "paymentAmount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "test",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawAllFunds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]