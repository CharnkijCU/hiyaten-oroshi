'use client';
import React, { useState, useEffect, useMemo } from 'react';

// A predefined list of users
const allUsers = [
    { id: 1, name: 'Christopher' },
    { id: 2, name: 'Maximilian' },
    { id: 3, name: 'Penelope' },
    { id: 4, name: 'Jonathan' },
    { id: 5, name: 'Alexander' },
];

// This function simulates being very slow
const getLongestName = (users: any): string => {
    console.log('🐌 Finding longest name... (This is slow!)');
    let longestName = '';
    users.forEach((user: any) => {
        // Simulate a delay
        let i = 0;
        while (i < 100000000) { i++; }
        if (user.name.length > longestName.length) {
            longestName = user.name;
        }
    });
    return longestName;
};

export default function UserList() {
    const [users] = useState(allUsers);
    const [searchTerm, setSearchTerm] = useState('');

    // ======================= Use Memo =======================
    // *** Synchronous. The value is calculated during the initial render. The component renders once with the correct value immediately available.

    // 1. Filter the users based on the search term
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // 2. THIS IS THE PROBLEM: Find the longest name on EVERY render
    // AFTER
    const longestName = useMemo(() => getLongestName(users), [users]);
    // 3. EFFECT: Log when the filtered list changes
    useEffect(() => {
        console.log('✅ useEffect: Filtered list has changed.');
    }, [filteredUsers]);

    // ======================= Use Effect + Use State =======================
    // *** Asynchronous. Causes two renders.
    // 1. Initial render happens with the default state ('').
    // 2. useEffect runs after this render, calculates the value, and calls setLongestName(), triggering a second render.

    // // Create a separate state to HOLD the calculated value
    // const [longestName, setLongestName] = useState('');
    // // EFFECT: Calculate the longest name when `users` changes
    // useEffect(() => {
    //     // This code runs AFTER the component renders
    //     const result = getLongestName(users);
    //     setLongestName(result);
    // }, [users]); // Dependency array ensures this only runs when `users` changes

    // const filteredUsers = users.filter(user =>
    //     user.name.toLowerCase().includes(searchTerm.toLowerCase())
    // );


    return (
        <div>
            <h2>User List</h2>
            <input
                type="text"
                placeholder="Filter users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <h3>All Users</h3>
            <ul>
                {users.map(user => <li key={user.id}>{user.name}</li>)}
            </ul>
            <hr />
            <h3>Filtered Users</h3>
            <ul>
                {filteredUsers.map(user => <li key={user.id}>{user.name}</li>)}
            </ul>
            <hr />
            <p><strong>Longest name in the original list:</strong> {longestName}</p>
        </div>
    );
}
