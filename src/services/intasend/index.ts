'use server'

import { db } from '@/database';
import { intasend, WalletFormDetails } from './config'

export async function createWallet(details: WalletFormDetails) {
    const walletsApi = intasend.wallets()
    let wallet = await walletsApi.create(details);
    console.log({ details })
    console.log({ wallet })
    // store in database
    // db
}