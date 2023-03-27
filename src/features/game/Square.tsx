import React from 'react';
import { calc } from './Util';

export default function Square({ black, children }) {
    const fill = black ? '#87b9a9' : undefined;

    return (
        <div style={{
            background: fill,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '--size': '50',
            fontSize: calc('--size')
        }}>
            {children}
        </div>
    )
}
