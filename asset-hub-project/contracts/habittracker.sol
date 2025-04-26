// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract HabitTracker {
    address public owner;
    uint256 public constant STAKE_DEADLINE = 3 days;

    struct Habit {
        string description;
        uint256 stakeAmount;
        address validator;
        uint256 deadline;
        bool submitted;
        bool validated;
        string proof;
    }

    mapping(address => Habit) public habits;

    event HabitStarted(address indexed user, string description, uint256 stake, address validator);
    event ProofSubmitted(address indexed user, string proof);
    event HabitValidated(address indexed user, bool success);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyValidator(address user) {
        require(msg.sender == habits[user].validator, "Not authorized validator");
        _;
    }

    function startHabit(string calldata description, address validator) external payable {
        require(habits[msg.sender].stakeAmount == 0, "Habit already started");
        require(msg.value > 0, "Stake must be greater than 0");

        habits[msg.sender] = Habit({
            description: description,
            stakeAmount: msg.value,
            validator: validator,
            deadline: block.timestamp + STAKE_DEADLINE,
            submitted: false,
            validated: false,
            proof: ""
        });

        emit HabitStarted(msg.sender, description, msg.value, validator);
    }

    function submitProof(string calldata proof) external {
        Habit storage habit = habits[msg.sender];
        require(habit.stakeAmount > 0, "No active habit");
        require(block.timestamp <= habit.deadline, "Deadline passed");
        require(!habit.submitted, "Proof already submitted");

        habit.proof = proof;
        habit.submitted = true;

        emit ProofSubmitted(msg.sender, proof);
    }

    function validateHabit(address user, bool success) external onlyValidator(user) {
        Habit storage habit = habits[user];
        require(habit.submitted, "No proof submitted");
        require(!habit.validated, "Already validated");

        habit.validated = true;

        if (success) {
            payable(user).transfer(habit.stakeAmount); // Return stake
        } else {
            // Burn stake by sending to 0xdead
            payable(0x000000000000000000000000000000000000dEaD).transfer(habit.stakeAmount);
        }

        emit HabitValidated(user, success);
    }

    function getHabit(address user) external view returns (Habit memory) {
        return habits[user];
    }
}
