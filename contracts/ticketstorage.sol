// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract TicketStorage {

    // TICKET
    struct Ticket {
        address payable buyer; // Owner of the ticket
        address payable receiver; // Transport provider
        uint amount; // Floating numbers aren't fully supported by Solidity yet
        bool isAvailable; // Is the ticket available (true) or booked (false)?
    }

    Ticket[] public tickets; // All tickets are here with public visibility
    // Use index of ticket as its unique ID

    function _createTicket(address payable _buyer, address payable _receiver, uint _amount, bool _isAvailable) private {
        tickets.push(Ticket(_buyer, _receiver, _amount, _isAvailable));
    }

    function generateNewTicket(address payable _buyer, uint _amount, bool _isAvailable) public {
        address payable receiver = payable(msg.sender); // Ticket provider calls generateNewTicket()
        _createTicket(_buyer, receiver, _amount, _isAvailable);
    }
}