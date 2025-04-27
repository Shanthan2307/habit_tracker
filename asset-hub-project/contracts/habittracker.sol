// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract HabitTracker {
    address public owner;
    uint256 public constant STAKE_DEADLINE = 3 days;

    struct Habit {
        string description;
        uint256 stakeAmount;
        uint256 deadline;
        bool submitted;
        bool validated;
        string proof;
    }

    mapping(address => Habit) public habits;

    event HabitStarted(address indexed user, string description, uint256 stake);
    event ProofSubmitted(address indexed user, string proof);
    event HabitValidated(address indexed user, bool success);

    constructor() {
        owner = msg.sender;
    }

    function startHabit(string calldata description) external payable {
        require(habits[msg.sender].stakeAmount == 0, "Habit already started");
        require(msg.value > 0, "Stake must be greater than 0");

        habits[msg.sender] = Habit({
            description: description,
            stakeAmount: msg.value,
            deadline: block.timestamp + STAKE_DEADLINE,
            submitted: false,
            validated: false,
            proof: ""
        });

        emit HabitStarted(msg.sender, description, msg.value);
    }

    function submitProof(string calldata proof) external {
        Habit storage habit = habits[msg.sender];
        require(habit.stakeAmount > 0, "No active habit");
        require(block.timestamp <= habit.deadline, "Deadline passed");
        require(!habit.submitted, "Proof already submitted");

        habit.proof = proof;
        habit.submitted = true;
        habit.validated = true;

        // Return stake since proof was submitted on time
        payable(msg.sender).transfer(habit.stakeAmount);

        emit ProofSubmitted(msg.sender, proof);
        emit HabitValidated(msg.sender, true);
    }

    function getHabit(address user) external view returns (Habit memory) {
        return habits[user];
    }
}
