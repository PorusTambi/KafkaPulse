const TOPIC_NAMES = {
    'DEFAULT_PARTITIONING': 'DefaultPartitioning',
    'KEYED_ORDERED_PARTITIONING': 'KeyedOrderedPartitioning',
    'CONSUMER_GROUPS': 'ConsumerGroups',
    'REBALANCING': 'Rebalancing',
    'RESUMING_MESSAGES': 'ResumingMessages'
}

const COLORS = {
    reset: "\x1b[0m",       // Resets all colors and styles back to normal
    bright: "\x1b[1m",      // Makes text bold/bright
    cyan: "\x1b[36m",       // Bright cyan text for borders
    green: "\x1b[32m",      // Bright green text for success message
    yellow: "\x1b[33m",     // Yellow text to highlight the URL
    bgBlue: "\x1b[44m",     // Blue background banner for maximum visibility
    white: "\x1b[37m"       // Crisp white text on colored background
}

const APP_CONSTANTS = {
    TOPIC_NAMES,
    COLORS
}

export default APP_CONSTANTS