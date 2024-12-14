'use server'

import { intasend, WalletFormDetails } from './config'

export async function createWallet(details: WalletFormDetails) {
    const walletsApi = intasend.wallets()
    let result = await walletsApi.create(details);
    console.log({ details })
    console.log({ result })
}