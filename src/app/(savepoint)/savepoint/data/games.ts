export interface Game {
    id: string;
    indexNumber: string;
    title: string;
    year: number;
    genre: string[];
    accent: string;
    tagline: string;
    hook: string;
    description: string;
    worldNotes: string[];
    archiveSpecs: {
        catalogCode: string;
        romCapacity: string;
        saveBattery: string;
        perspective: string;
    };
    labelUrl: string;
    worldUrl: string;
}
export const games: Game[] = [
    {
        "id": "lost-signal",
        "title": "Lost Signal",
        "year": 1998,
        "genre": [
            "Sci-fi",
            "Exploration",
            "Puzzle"
        ],
        "accent": "#8BAAF7",
        "hook": "A distant transmission draws a lone explorer into a forgotten planetary observatory.",
        "tagline": "Some messages were never meant to be answered.",
        "description": "Beyond the mapped edge of the system, an abandoned observatory has begun transmitting again. Cross silent canyons, restore forgotten relays, and uncover who — or what — is still listening.",
        "worldNotes": [
            "The observatory was built to record the sky. Its final log contains a voice from beneath the planet.",
            "Every relay restores a fragment of a conversation that began before the station existed."
        ],
        "indexNumber": "01",
        "archiveSpecs": {
            "catalogCode": "SVP-01 / 98",
            "romCapacity": "64 MEGABIT MASK ROM",
            "saveBattery": "SRAM + LITHIUM CELL (3 SLOTS)",
            "perspective": "ISOMETRIC / FIXED TELEMETRY"
        },
        "labelUrl": "/templates/savepoint/label-lost-signal.png",
        "worldUrl": "/templates/savepoint/world-lost-signal.webp"
    },
    {
        "id": "mossheart",
        "title": "Mossheart",
        "year": 1996,
        "genre": [
            "Fantasy",
            "Adventure"
        ],
        "accent": "#9EBC7B",
        "hook": "Ancient machinery sleeps beneath a forest that remembers everything.",
        "tagline": "The roots remember your name.",
        "description": "Follow a wandering seedkeeper into the green machinery beneath an ancient woodland. Mend forgotten engines without breaking the living roots that have made them home.",
        "worldNotes": [
            "Trees archive their memories in rings of copper and sap. Read the oldest trunks to find paths that have vanished.",
            "Repair changes the forest rather than resetting it; each awakened machine earns its place in the canopy."
        ],
        "indexNumber": "02",
        "archiveSpecs": {
            "catalogCode": "SVP-02 / 96",
            "romCapacity": "32 MEGABIT MASK ROM",
            "saveBattery": "EEPROM (2 GARDENS)",
            "perspective": "TOP-DOWN / HAND-PAINTED"
        },
        "labelUrl": "/templates/savepoint/label-mossheart.png",
        "worldUrl": "/templates/savepoint/world-mossheart.webp"
    },
    {
        "id": "turbo-saints",
        "title": "Turbo Saints",
        "year": 1999,
        "genre": [
            "Arcade",
            "Racing"
        ],
        "accent": "#F58A5C",
        "hook": "Chase sunset, speed and the final finish line across impossible highways.",
        "tagline": "One last lap before the sun goes out.",
        "description": "Race a crew of roadside legends across highways suspended over a burning sea. Trade clean corners for dangerous shortcuts as the sunset clock counts down the final championship.",
        "worldNotes": [
            "Each driver carries a cassette recorded for someone waiting at the finish. The radio reveals their stories between races.",
            "Roads fold through abandoned toll booths, coastal flyovers and the ruins of a city built around speed."
        ],
        "indexNumber": "03",
        "archiveSpecs": {
            "catalogCode": "SVP-03 / 99",
            "romCapacity": "96 MEGABIT MASK ROM",
            "saveBattery": "EEPROM / LAP RECORDS",
            "perspective": "CHASE CAMERA / ARCADE"
        },
        "labelUrl": "/templates/savepoint/label-turbo-saints.png",
        "worldUrl": "/templates/savepoint/world-turbo-saints.webp"
    },
    {
        "id": "dead-channel",
        "title": "Dead Channel",
        "year": 2001,
        "genre": [
            "Horror",
            "Mystery"
        ],
        "accent": "#D45E66",
        "hook": "A broadcast from a town erased from every map refuses to go silent.",
        "tagline": "Stay tuned. Stay inside.",
        "description": "A late-night television repair leads you to a town absent from every map. Follow its emergency broadcasts through empty rooms and discover why every screen is showing tomorrow.",
        "worldNotes": [
            "The broadcast schedule is the only reliable clock in town. Missing a program changes what waits outside.",
            "Domestic spaces repeat with subtle errors: an extra door, a photograph turned around, a voice one room ahead."
        ],
        "indexNumber": "04",
        "archiveSpecs": {
            "catalogCode": "SVP-04 / 01",
            "romCapacity": "128 MEGABIT MASK ROM",
            "saveBattery": "SRAM (1 TRANSMISSION)",
            "perspective": "FIXED CAMERA / ANALOGUE"
        },
        "labelUrl": "/templates/savepoint/label-dead-channel.png",
        "worldUrl": "/templates/savepoint/world-dead-channel.webp"
    },
    {
        "id": "moon-relay",
        "title": "Moon Relay",
        "year": 1997,
        "genre": [
            "Puzzle",
            "Strategy"
        ],
        "accent": "#D9C68E",
        "hook": "Reconnect a silent lunar network one brilliant circuit at a time.",
        "tagline": "A small light. A very long way home.",
        "description": "Route power across a stranded lunar communications network. Balance fragile circuits, moving shadows and limited reserves to carry one final message back to Earth.",
        "worldNotes": [
            "Sunlight travels slowly across the crater floor, turning safe routes into frozen gaps.",
            "Every station holds a handwritten message from its former operator; reconnecting them assembles a shared farewell."
        ],
        "indexNumber": "05",
        "archiveSpecs": {
            "catalogCode": "SVP-05 / 97",
            "romCapacity": "24 MEGABIT MASK ROM",
            "saveBattery": "EEPROM / 12 CIRCUITS",
            "perspective": "ORTHOGRAPHIC / GRID"
        },
        "labelUrl": "/templates/savepoint/label-moon-relay.png",
        "worldUrl": "/templates/savepoint/world-moon-relay.webp"
    },
    {
        "id": "neon-ruins",
        "title": "Neon Ruins",
        "year": 2002,
        "genre": [
            "Action",
            "Platformer"
        ],
        "accent": "#B58AF5",
        "hook": "Carry a forbidden signal across the rooftops of a collapsing neon city.",
        "tagline": "Keep the signal moving.",
        "description": "Leap between unstable towers in a city dismantling itself at dawn. A stolen transmitter is your only weapon, opening routes through the electric ghosts of its infrastructure.",
        "worldNotes": [
            "The skyline is a circuit diagram. Redirecting current can save a platform and darken an entire neighborhood.",
            "Billboards preserve fragments of a language the city has ordered its residents to forget."
        ],
        "indexNumber": "06",
        "archiveSpecs": {
            "catalogCode": "SVP-06 / 02",
            "romCapacity": "128 MEGABIT MASK ROM",
            "saveBattery": "FLASH / CHECKPOINTS",
            "perspective": "SIDE-SCROLLING / PARALLAX"
        },
        "labelUrl": "/templates/savepoint/label-neon-ruins.png",
        "worldUrl": "/templates/savepoint/world-neon-ruins.webp"
    },
    {
        "id": "paper-kingdom",
        "title": "Paper Kingdom",
        "year": 1995,
        "genre": [
            "Tactical",
            "Fantasy"
        ],
        "accent": "#D99B79",
        "hook": "Rewrite the fate of a kingdom folded from maps, letters and memories.",
        "tagline": "Every fold changes the story.",
        "description": "Command a tiny court across maps that fold into mountains and letters that become bridges. Rewrite a disputed inheritance with careful tactics and the memories hidden in the margins.",
        "worldNotes": [
            "Units carry histories on their reverse sides. Turning a soldier over can reveal a diplomat.",
            "Rain is the kingdom’s oldest enemy; protecting an archive may matter more than holding a fortress."
        ],
        "indexNumber": "07",
        "archiveSpecs": {
            "catalogCode": "SVP-07 / 95",
            "romCapacity": "16 MEGABIT MASK ROM",
            "saveBattery": "SRAM / 3 CHRONICLES",
            "perspective": "ISOMETRIC / TURN-BASED"
        },
        "labelUrl": "/templates/savepoint/label-paper-kingdom.png",
        "worldUrl": "/templates/savepoint/world-paper-kingdom.webp"
    },
    {
        "id": "deep-current",
        "title": "Deep Current",
        "year": 2000,
        "genre": [
            "Underwater",
            "Exploration"
        ],
        "accent": "#64C1C2",
        "hook": "Descend beyond the last charted depth in a fragile research vessel.",
        "tagline": "There is still light below.",
        "description": "Pilot a fragile survey vessel past the last marked contour on the ocean floor. Listen to the hull, ration your power and follow an impossible light into the deep.",
        "worldNotes": [
            "Sonar reveals architecture where geology should be. No two survey passes return the same shape.",
            "The cabin is a small refuge: a thermos, a notebook and a window that becomes a mirror as you descend."
        ],
        "indexNumber": "08",
        "archiveSpecs": {
            "catalogCode": "SVP-08 / 00",
            "romCapacity": "96 MEGABIT MASK ROM",
            "saveBattery": "SRAM / DIVE LOG",
            "perspective": "FIRST-PERSON / SONAR"
        },
        "labelUrl": "/templates/savepoint/label-deep-current.png",
        "worldUrl": "/templates/savepoint/world-deep-current.webp"
    },
    {
        "id": "ghost-frequency",
        "title": "Ghost Frequency",
        "year": 2003,
        "genre": [
            "Rhythm",
            "Mystery"
        ],
        "accent": "#B4A2F3",
        "hook": "Decode the city hidden between music, static and midnight transmissions.",
        "tagline": "Somewhere between stations, a city listens.",
        "description": "Tune a pirate receiver to rhythms that reveal a second city after midnight. Follow missing musicians through its stations and reconstruct the song that keeps its streets from disappearing.",
        "worldNotes": [
            "Each district occupies a different band of the spectrum. Their melodies overlap at places the map cannot show.",
            "Silence is a deliberate note; listening without playing can reveal an entirely different route."
        ],
        "indexNumber": "09",
        "archiveSpecs": {
            "catalogCode": "SVP-09 / 03",
            "romCapacity": "128 MEGABIT MASK ROM",
            "saveBattery": "FLASH / MIX TAPES",
            "perspective": "SIDE VIEW / RHYTHMIC"
        },
        "labelUrl": "/templates/savepoint/label-ghost-frequency.png",
        "worldUrl": "/templates/savepoint/world-ghost-frequency.webp"
    },
    {
        "id": "sunken-arcade",
        "title": "Sunken Arcade",
        "year": 1994,
        "genre": [
            "Surreal",
            "Platformer"
        ],
        "accent": "#F2A57C",
        "hook": "Beneath the waves, every arcade cabinet opens another dream.",
        "tagline": "One more coin. One more dream.",
        "description": "Explore a drowned amusement hall where each glowing cabinet opens a pocket universe. Collect forgotten tokens and follow the tide toward the machine still waiting for its first player.",
        "worldNotes": [
            "The water never reaches the screens. Their glow draws tiny schools of fish through the abandoned aisles.",
            "Dreams borrow pieces from neighboring games, turning familiar platforms into shifting conversations."
        ],
        "indexNumber": "10",
        "archiveSpecs": {
            "catalogCode": "SVP-10 / 94",
            "romCapacity": "16 MEGABIT MASK ROM",
            "saveBattery": "PASSWORD / TOKEN LEDGER",
            "perspective": "SIDE-SCROLLING / DREAM LOGIC"
        },
        "labelUrl": "/templates/savepoint/label-sunken-arcade.png",
        "worldUrl": "/templates/savepoint/world-sunken-arcade.webp"
    }
];
