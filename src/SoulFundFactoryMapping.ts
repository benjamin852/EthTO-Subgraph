import { Address, log } from '@graphprotocol/graph-ts';
import { NewSoulFundTokenDeployed } from '../generated/SoulFundFactory/SoulFundFactory';
import { SoulFund } from '../generated/templates';
import { loadOrCreateFund } from './factories/FundFactory';

export function handleNewSoulFundTokenDeployed(event: NewSoulFundTokenDeployed): void {
    log.warning('New Whitelisted hash: {}', [event.transaction.hash.toHex()]);

    // assume soulbound
    const id = event.params.tokenAddress;
    let fund = loadOrCreateFund(id);

    fund.address = event.params.tokenAddress;
    fund.beneficiary = event.params.beneficiary;
    fund.save();
    SoulFund.create(id);
}
