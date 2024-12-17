import { create } from '@quested/sdk';

const quested = create({
    activityId: "coinflip",
});

quested.api.player.trackEvent("coinflip", {})

