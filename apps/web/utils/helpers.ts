// Helpers
// ========================================================
/**
 * @dev threshold definition for different nfts
 */
export const THRESHOLDS = {
	HIGHEST: {
    LEVEL: 6,
		AMOUNT: 1000,
    // https://gateway.irys.xyz/uCH9_hFquLGestxxqpb8fOzkvqmH9ml97yBBBWAMYVE
		IMGURL: 'uCH9_hFquLGestxxqpb8fOzkvqmH9ml97yBBBWAMYVE',
	},
	HIGHER: {
    LEVEL: 5,
		AMOUNT: 800,
		IMGURL: 'a-Q7IXEy735yWCOEfgp1bgGSD9vLawTT2O3LBpESvA0',
	},
	HIGH: {
    LEVEL: 4,
		AMOUNT: 500,
		IMGURL: 'khAwOQye6FwVo3dke6lxpjQB9Lk2cs8KWC2YabKX6YA',
	},
	MID: {
    LEVEL: 3,
		AMOUNT: 200,
		IMGURL: 'ihomfDqu-hf5ht1uHX4-Urcs1Q3LXQB4lA2XMWZstNw',
	},
	LOW: {
    LEVEL: 2,
		AMOUNT: 100,
		IMGURL: 'huoCmXgzx2RL2UJmEfagMwjYJbKAvq-NmidDWMYjwuU',
	},
	LOWEST: {
    LEVEL: 1,
		AMOUNT: 10,
		IMGURL: 'z96_wiRiePlZY2yHO7l91kAVrFUpyDKyJ10cV-aliF4',
	},
	DEFAULT: {
    LEVEL: 0,
		AMOUNT: 0,
		IMGURL: 'LgE8H04XXKx3RMUYN7gWtv65nwMtVxJ2AsGOjr4fYfw',
	},
};

/**
 *
 * @param bHoneyAmount
 * @returns
 */
export const getThreshold = (bHoneyAmount: number) => {
	if (bHoneyAmount > THRESHOLDS.HIGHEST.AMOUNT) {
		return THRESHOLDS.HIGHEST;
	} else if (bHoneyAmount > THRESHOLDS.HIGHER.AMOUNT) {
		return THRESHOLDS.HIGHER;
	} else if (bHoneyAmount > THRESHOLDS.HIGH.AMOUNT) {
		return THRESHOLDS.HIGH;
	} else if (bHoneyAmount > THRESHOLDS.MID.AMOUNT) {
		return THRESHOLDS.MID;
	} else if (bHoneyAmount > THRESHOLDS.LOW.AMOUNT) {
		return THRESHOLDS.LOW;
	} else if (bHoneyAmount > THRESHOLDS.LOWEST.AMOUNT) {
		return THRESHOLDS.LOWEST;
	}
	return THRESHOLDS.DEFAULT;
};