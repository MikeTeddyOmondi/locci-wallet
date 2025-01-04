import "server-only";

import IntaSend from 'intasend-node';

export const intasend = new IntaSend(
    process.env.INTASEND_PUBLIC_KEY,
    process.env.INTASEND_SECRET_KEY,
    process.env.INTASEND_TEST_MODE, // Test ? Set true for test environment
);
