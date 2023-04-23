// @flow
import { Colors } from './Colors';

export const defaultBoldFont = 'TradeGothicLTPro-BdCn20';
export const defaultFont = 'TradeGothicLTPro-Cn18';

export const ruBoldFont = 'DINCondensed-DemiBold';
export const ruFont = 'DINCondensed-Light';

const type = {
    BoldCondensed20: defaultBoldFont,
    Condensed18: defaultFont,
};

const size = {};

const getBold = () => type.BoldCondensed20;
const getRegular = () => type.Condensed18;

export default {
    type,
    size,
    ruBoldFont,
    defaultBoldFont,
    defaultFont,
    ruFont,
    getBold,
    getRegular,
};
