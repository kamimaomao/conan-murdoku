# Conan Shared Asset System Design

## Goal

Build Conan Murdoku as a scene-position puzzle, not an evidence-display board. Board cells are identified by reusable environment objects, with evidence items and Conan classic items used sparingly.

## Core Rule

Most objects must be reusable environment anchors: furniture, fixtures, public-space objects, travel objects, school objects, kitchen objects, and media-studio objects. A case may use 0-1 explicit evidence object. Conan classic items are rare theme anchors and must not replace the environment-object grammar.

## Asset Categories

### Shared Room Textures

- `agency-carpet`: deep blue office carpet
- `cafe-wood`: warm cafe wood floor
- `school-wood`: classroom wood floor
- `arcade-tile`: Beika shopping arcade tile
- `backstage-rubber`: TV backstage black rubber floor
- `hotel-stone`: hotel lobby stone floor
- `beach-deck`: seaside wood deck
- `kitchen-tile`: kitchen studio tile floor
- `wedding-carpet`: wedding hall carpet
- `lodge-wood`: lakeside lodge wood floor
- `snow-path`: snowy path ground
- `train-carpet`: train car carpet
- `bridge-metal`: river bridge metal deck
- `hotel-carpet`: hotel corridor carpet
- `default-floor`: neutral scene floor

### Shared Environment Objects

- `office-desk`: office desk
- `bed`: bed for later residential scenes
- `sofa`: sofa
- `filing-cabinet`: filing cabinet
- `telephone`: desk telephone
- `round-table`: round table
- `counter-stool`: counter stool
- `menu-board`: menu board
- `cash-register`: cash register
- `school-desk`: school desk
- `school-bag`: school bag
- `lectern`: classroom lectern
- `locker`: locker
- `potted-plant`: potted plant
- `blackboard-eraser`: blackboard eraser
- `mailbox`: mailbox
- `umbrella-stand`: umbrella stand
- `flower-pot`: flower pot
- `bench`: public bench
- `streetlamp`: streetlamp
- `vending-machine`: vending machine
- `director-chair`: director chair
- `vanity-mirror`: dressing mirror
- `light-stand`: studio light stand
- `prop-box`: prop box
- `costume-rack`: costume rack
- `monitor-screen`: studio monitor
- `front-desk-bell`: hotel front desk bell
- `suitcase`: suitcase
- `deck-chair`: seaside deck chair
- `lifebuoy`: lifebuoy
- `parasol`: beach parasol
- `coin-binoculars`: observation binoculars
- `prep-table`: preparation table
- `cooking-pot`: cooking pot
- `cutting-board`: cutting board
- `plate`: plate
- `camera`: studio camera
- `refrigerator`: refrigerator
- `trash-bin`: trash bin
- `dining-table`: dining table
- `chair`: chair
- `flower-arch`: wedding flower arch
- `microphone`: microphone
- `gift-box`: gift box
- `champagne-tower`: champagne tower
- `coat-rack`: coat rack
- `keycard`: hotel keycard
- `fireplace`: fireplace
- `coffee-table`: coffee table
- `snow-boot`: snow boot
- `bookshelf`: bookshelf
- `oil-lantern`: oil lantern
- `train-seat`: train seat
- `luggage-rack`: luggage rack
- `ticket-clip`: ticket clip
- `observation-rail`: observation rail
- `map-stand`: map stand
- `train-door`: train door

### Sparse Evidence And Conan Items

- `coffee-cup`: normal cafe cup, can be a clue item but not always evidence
- `script-paper`: TV script paper
- `glass`: hotel glass
- `ticket`: ticket or receipt
- `detective-badge`: Detective Boys badge
- `soccer-ball`: Conan soccer ball
- `skateboard`: Conan skateboard
- `voice-changer`: bow-tie voice changer

## Case Invocation Table

### Case 01: Mouri Detective Agency

Room textures: `agency-carpet`, `cafe-wood`, `hotel-carpet`, `arcade-tile`

Objects: `office-desk`, `mailbox`, `sofa`, `filing-cabinet`

Evidence/classic item: none in the board. Conan appears as support portrait.

### Case 02: Poirot Cafe

Room textures: `cafe-wood`, `agency-carpet`, `arcade-tile`, `hotel-carpet`

Objects: `counter-stool`, `round-table`, `coffee-cup`, `menu-board`, `cash-register`

Evidence/classic item: `coffee-cup` doubles as a natural clue item.

### Case 03: Teitan Elementary

Room textures: `school-wood`, `agency-carpet`, `arcade-tile`, `cafe-wood`

Objects: `school-desk`, `school-bag`, `lectern`, `locker`, `potted-plant`, `blackboard-eraser`

Evidence/classic item: `detective-badge` can appear in a later variant, not required for this data pass.

### Case 04: Beika Shopping Arcade

Room textures: `arcade-tile`, `cafe-wood`, `hotel-carpet`, `agency-carpet`

Objects: `mailbox`, `umbrella-stand`, `flower-pot`, `bench`, `streetlamp`, `vending-machine`

Evidence/classic item: none.

### Case 05: TV Backstage

Room textures: `backstage-rubber`, `kitchen-tile`, `hotel-carpet`, `arcade-tile`

Objects: `director-chair`, `vanity-mirror`, `light-stand`, `prop-box`, `costume-rack`, `monitor-screen`

Evidence/classic item: no board evidence; the missing script is narrative context.

### Case 06: Seaside Hotel

Room textures: `hotel-stone`, `beach-deck`, `hotel-carpet`, `cafe-wood`

Objects: `front-desk-bell`, `lifebuoy`, `suitcase`, `deck-chair`, `parasol`, `potted-plant`, `coin-binoculars`

Evidence/classic item: `glass` is optional in a later harder variant.

### Case 07: Cooking Studio

Room textures: `kitchen-tile`, `backstage-rubber`, `cafe-wood`, `hotel-carpet`

Objects: `cooking-pot`, `cutting-board`, `prep-table`, `plate`, `camera`, `monitor-screen`, `counter-stool`, `trash-bin`

Evidence/classic item: none.

### Case 08: Wedding Hall

Room textures: `wedding-carpet`, `hotel-carpet`, `cafe-wood`, `agency-carpet`

Objects: `flower-arch`, `dining-table`, `telephone`, `microphone`, `camera`, `chair`, `gift-box`, `keycard`, `coat-rack`

Evidence/classic item: `microphone` can carry testimony but remains a scene item.

### Case 09: Lakeside Lodge

Room textures: `lodge-wood`, `snow-path`, `hotel-carpet`, `bridge-metal`

Objects: `fireplace`, `snow-boot`, `bench`, `coffee-table`, `bookshelf`, `lifebuoy`, `sofa`, `suitcase`, `oil-lantern`

Evidence/classic item: none.

### Case 10: Scenic Train

Room textures: `train-carpet`, `bridge-metal`, `hotel-carpet`, `hotel-stone`

Objects: `train-seat`, `luggage-rack`, `dining-table`, `ticket-clip`, `observation-rail`, `map-stand`, `coffee-cup`, `train-door`, `trash-bin`

Evidence/classic item: `soccer-ball` or `skateboard` is reserved as a rare future cameo, not part of this main solution set.

## Production Requirements

- App-facing assets must be PNG images.
- Object assets must be saved as independent PNG files, not sprite sheets or cropped atlas slices.
- Shared object icons should be locally batch-rendered at 128x128 and kept under 20KB each.
- Portrait and support character icons should be normalized to 256x256 and kept under 512KB each.
- Room texture images should be compact square PNGs; the board must not render one terrain `<img>` per cell.
- Object assets should use transparent backgrounds unless the object naturally fills the whole tile.
- Room texture assets must be material/area textures, not miniature room scenes.
- The same object asset must be reusable across multiple cases.
- No copied original Murdoku assets may be referenced.
