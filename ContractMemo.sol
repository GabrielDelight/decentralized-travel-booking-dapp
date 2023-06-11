// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/utils/Strings.sol";

contract baseContract {
    address internal admin;
    uint256 internal incrementingSeatNumber = 1;
    uint256 incrementingRoomNUmber = 1;
    string public flightStatus = "open";

    constructor() {
        admin = msg.sender;
    }

    // Flight booking struct
    struct flightBookingStruct {
        address bookingOwnerAddress;
        string flightNumber;
        uint256 paymentAmount;
        string flightStatus;
        uint256 seatNumber;
        string fareTypes;
        string LeavingOn;
        string returningOn;
        string toWhere;
        string itinerary;
        uint256 numberOfPassangers;
    }

    // Hotel Booking struct
    struct HotelBookingStruct {
        address bookingOwnerAddress;
        uint256 bookingNumber;
        string checkIn;
        string checkOut;
        string goingTo;
        uint256 numberOfGuest;
        uint256 numberOfRooms;
        string purposeOfTraveling;
        uint256 paymentAmount;
    }

    mapping(address => flightBookingStruct) public flightBookingAddresses;
    mapping(address => HotelBookingStruct) public hotelBookingAddress;
    mapping(address => uint256) public balanceAddress;

    modifier onlyAdmin() {
        require(msg.sender == admin, "You are not authorized");
        _;
    }

    // Modifier for flight staus
    modifier checkFlightStatus() {
        require(
            keccak256(abi.encodePacked(flightStatus)) ==
                keccak256(abi.encodePacked("open")),
            "Flight status is closed"
        );
        _;
    }

    // Deposit to Contract
    function deposit() external payable {
        balanceAddress[msg.sender] += msg.value;
    }

    // Check contract balance
    function contractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // User to withdraw balance
    function balanceWithdraw(uint256 _amount) public {
        uint256 amountInWei = _amount * 1 ether;

        require(
            balanceAddress[msg.sender] >= amountInWei,
            "Insufficient funds"
        );
        payable(msg.sender).transfer(amountInWei);
        balanceAddress[msg.sender] -= amountInWei;
    }

    // Withdraw all funds (only admin)
    function withdrawAllFunds() public onlyAdmin {
        payable(admin).transfer(contractBalance());
        balanceAddress[msg.sender] = 0;
    }
}

// Flight booking contract....
contract FlightBooking is baseContract {
    function FlightBookings(
        string memory fareTypes,
        string memory LeavingOn,
        string memory returningOn,
        string memory toWhere,
        string memory itinerary,
        uint256 numberOfPassangers
    ) public checkFlightStatus {
        require(
            balanceAddress[msg.sender] >= 2 ether,
            "Insufficient funds. Please deposit 2 eth to wallet."
        );

        string memory airlineNumber = Strings.toString(block.timestamp); // Convert string to number
        // Concatenating 2 strings
        string memory joinedFlightNumber = string.concat("AC", airlineNumber);

        flightBookingStruct memory booking = flightBookingStruct(
            address(msg.sender),
            joinedFlightNumber,
            uint256(1 ether),
            flightStatus,
            incrementingSeatNumber,
            fareTypes,
            LeavingOn,
            returningOn,
            toWhere,
            itinerary,
            numberOfPassangers
        );
        flightBookingAddresses[msg.sender] = booking;
        incrementingSeatNumber + 1; // Incrementing the seaat number
        balanceAddress[msg.sender] -= 2 ether; // Deducting funds (2 ether)
    }
}

// Hotel booking contract
contract HotelBooking is FlightBooking {
    function HotelBookings(
        string memory goingTo,
        uint256 numberOfGuest,
        uint256 numberOfRooms,
        string memory purposeOfTraveling,
        string memory checkIn,
        string memory checkOut
    ) public {
        // Check insufficnent funds
        require(
            balanceAddress[msg.sender] >= 1 ether,
            "Insufficient funds, please deposit at least 1 eth to wallet."
        );

        uint256 bookingNumber = block.timestamp;

        HotelBookingStruct memory booking = HotelBookingStruct(
            address(msg.sender),
            bookingNumber,
            checkIn,
            checkOut,
            goingTo,
            numberOfGuest,
            numberOfRooms,
            purposeOfTraveling,
            uint256(1 ether)
        );
        hotelBookingAddress[msg.sender] = booking;
        balanceAddress[msg.sender] -= 1 ether; // Deducting funds (1 ether)
    }
}

// Deploying contract that contains the booking for light  and hotel
contract BookingContract is HotelBooking {
    function test() public pure returns (string memory) {
        return "Everything is alright";
    }
}
