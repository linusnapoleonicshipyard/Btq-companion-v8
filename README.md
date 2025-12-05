Y.0 USING THE COMPANION APP
Y.1 What the Companion App Does
The Beat to Quarters Companion App eliminates all dice rolling and table consultation during gameplay. Every calculation—from ship statistics to gunnery damage to crew management—is handled instantly. The app tracks everything: hull damage, sail loss, crew casualties, gun availability, fires, boarding actions, and surrender conditions. You make the tactical decisions; the app does the mathematics.
The app runs entirely in your web browser and works offline after initial load. All game data is stored locally on your device.
Y.2 Accessing the Companion App
Visit: https://linusnapoleonicshipyard.github.io/Btq-companion-v8/
The app loads directly in your browser. Bookmark this page for quick access during gaming sessions. The app works on desktop computers, tablets, and mobile devices using any modern web browser (Chrome, Firefox, Safari, or Edge).
For offline play, open the app once while connected to the internet. Your browser will cache it, allowing you to use it without internet access afterward.
Y.3 Quick Start Guide
1. Open the app and set wind conditions (strength and direction) at the top of the screen
2. Click the "Ships" tab and create your first ship using the form
3. Add guns to your ship (broadside batteries, bow chasers, stern chasers)
4. Click "Add Ship to Fleet" when complete
5. Repeat for all ships in the game
6. Use other tabs (Movement, Gunnery, Damage, etc.) during play
7. Click "Next Turn" to advance the turn counter
Y.4 Top Navigation Controls
Y.4.1 Turn Counter
Displays the current turn number. Click "Next Turn" to advance. The turn counter helps track timed events like fire spread, wind changes, and boarding actions.
Y.4.2 Wind Controls
Set wind strength using the dropdown menu: Slight Breeze, Light Breeze, Gentle Breeze, Moderate Breeze, Fresh Breeze, or Gale. Select wind direction from the 32-point compass. Wind affects movement speed and available points of sail. Heavy weather (Fresh Breeze or Gale) closes lower deck gunports on two-decker ships (1st-4th Rates).
Y.4.3 Game Management Buttons
• New Game: Clears all ships and resets the game state. Use this to start a fresh scenario.
• Restart Turn: Returns the game to the previous turn state. Useful for correcting mistakes or trying different tactical options.
• Export: Downloads a JSON file containing the current game state. Save this file to continue the battle later or share with other players.
• Import: Loads a previously exported game file. All ships, damage, and settings are restored exactly as saved.
Y.4.4 Enhanced Fire System Toggle
Check this box to enable the Enhanced Fire system (v8 rule L.4). When enabled, fires have intensity levels, can spread between decks, and create magazine explosion risks after four turns. When disabled, fires use the standard rules from the base game.
 
Y.5 Ships Tab
The Ships tab is where you create and manage your fleet.
Y.5.1 Creating a Ship
Fill in the ship creation form:
• Ship Name: Enter any name (HMS Victory, L'Orient, USS Constitution, etc.)
• Ship Class: Select from eight classes: 1st/2nd Rates, 3rd Rates, 4th Rates, American 4th Rates, 5th/6th Rates, Frigates, Large Brigs/Sloops, Cutters/Brigs
• Tonnage: Ship displacement in tons (e.g., 2200 for a 1st Rate, 1000 for a 3rd Rate)
• Sails: Number of sails from 1-10. The app automatically arranges them by mast based on count.
• Crew: Total crew size (e.g., 850 for a 1st Rate, 200 for a frigate)
• Quality: Experienced or Inexperienced (affects gunnery performance)
• Nationality: Select from dozens of historical navies with era-specific modifiers
Y.5.2 Adding Guns
Broadside Guns: Click "Add" to add gun groups. For each group, select gun type (32# Long, 24# Long, 18# Long, etc.) and count. The app automatically splits guns into Port and Starboard batteries. Add multiple gun groups for mixed-caliber armament.
Bow Chasers: Select gun type and count for forward-firing guns
Stern Chasers: Select gun type and count for aft-firing guns
Example: HMS Victory might have 30× 32# Long, 28× 24# Long, 30× 12# Long for broadside batteries, plus 2× 12# Long bow chasers and 2× 12# Long stern chasers.
When complete, click "Add Ship to Fleet". The app calculates all derived statistics automatically: HVN, SVN, GDN, LGBWN, CBWN, and PVN.
Y.5.3 Viewing Your Fleet
All created ships appear below the creation form. Each ship displays:
• Ship name, class, and nationality
• Current hull points vs. total HVN
• Remaining crew
• Operational guns by arc (Port/Starboard/Bow/Stern)
• Active sails and lost sails
• Active fires (if any)
• Surrender points
• Current status (Active, Struck, Captured, or Sunk)
Y.5.4 Ship Actions
Each ship card has action buttons:
• Grapple: Connect two ships for boarding actions. Select target ship and click "Grapple". Grappled ships cannot separate until one is captured or destroyed.
• Ungrapple: Separate grappled ships
• Strike Colors: Ship surrenders (SP reduced to zero, status becomes "Struck")
• Delete Ship: Remove ship from the game entirely
Y.6 Movement Tab
The Movement tab calculates ship speed based on wind, point of sail, and damage.
Y.6.1 Using the Movement Calculator
For each ship that moves:
1. Select the ship from the dropdown
2. Choose point of sail: Quarter Reach (QR), Running (Ru), Reaching (RN), Broad Reach (BR), or Close Hauled (CH)
3. The app displays Base Speed for that ship class, wind strength, and point of sail
4. If sails are lost, the app shows Max Speed After Damage (automatically reduced)
5. The Allowed Range shows your speed limits for this turn based on last turn's movement
The app enforces acceleration/deceleration limits automatically. You cannot move faster than 200% of your previous turn speed or slower than 50%.
Y.6.2 Sail Damage Impact
When sails are lost to damage, movement speed reduces proportionally. The app shows exactly which sails are lost and the percentage penalty. For example, losing 3 of 10 sails reduces speed by 30%.
Y.6.3 Crew Assignment Penalties
If using the optional Crew Management system (see Y.10), insufficient sailing crew reduces movement speed in 10% increments. If zero crew is assigned to sailing, the ship can only drift at reduced speed.
Y.6.4 Last Move Tracking
The app tracks each ship's Last Move distance. This determines acceleration/deceleration limits for the next turn. Update this field manually if needed (though the app usually handles it automatically).
Y.7 Gunnery Tab
The Gunnery tab resolves all firing actions.
Y.7.1 Firing Your Guns
To fire a broadside:
1. Select Firing Ship from dropdown
2. Select Target Ship
3. Choose Firing Arc: Port, Starboard, Bow, or Stern
4. Measure distance between ships on your table and enter Distance (cm)
5. Select Shot Type:
   - Round Shot: Standard solid shot for hull damage
   - Chain Shot: Two balls connected by chain, destroys rigging
   - Grape Shot: Anti-personnel shot for crew casualties
6. Select Aim Point:
   - Hull: Target the ship's structure (standard aim)
   - Rigging: Target masts and sails
   - Crew: Target personnel on deck (only available at close range)
7. Check "Initial Broadside" if this is the ship's first shot of the game (+50 to roll)
8. Click "Fire"
Y.7.2 Reading Results
After clicking Fire, a result panel displays:
• Total Hits: Number of shots that connected
• Total Damage: Hull damage inflicted
• Crew Casualties: If aiming at crew (1 casualty per 3 damage points - house rule)
• Gun Details: Breakdown by gun caliber showing how many hits each type scored
Damage is applied automatically to the target ship. Check the Damage tab to see updated hull points, gun losses, and surrender points.
Y.7.3 Heavy Weather Warning
In Fresh Breeze or Gale conditions, two-decker ships (1st-4th Rates) cannot open lower deck gunports. The app displays a warning banner and shows which heavy guns are unavailable. Only upper deck guns can fire in heavy weather.
Y.7.4 Magazine Flooding Effect
If a ship's magazine is flooded (see Y.8), ALL guns on that ship are disabled. The gunnery calculator will not allow a flooded ship to fire.
 
Y.8 Damage Tab
The Damage tab shows overall ship condition and handles fire management.
Y.8.1 Damage Status Display
Each ship shows:
• Hull: Remaining hull integrity as percentage (green > 50%, yellow 20-50%, red < 20%)
• Sails: Number of operational sails remaining
• Crew: Current crew count after casualties
• Surrender Points (SP): Current SP value (green ≥ 7, yellow 4-6, red < 4, white flag = 0)
• Point Value Number (PVN): Shown if PVN Surrender Penalties are enabled
Y.8.2 Fire Management
Ships with active fires show a fire panel displaying:
• Number of fires
• Age of each fire (turn counter)
• Intensity level (if Enhanced Fire system enabled)
• Explosion risk warning (fires aged 4+ turns)
Fire Management Buttons:
• Fire Party: Toggle organized fire fighting crew. When active, improves fire control chances but reduces available combat crew.
• Flood Magazine: Floods the ship's magazine to prevent explosion. This disables ALL guns permanently but eliminates explosion risk. Use this as a last resort when fires threaten the powder magazine.
Y.8.3 Critical Damage Indicators
Ships with critical hits show warnings for:
• Rudder Lost: Ship cannot steer (movement penalties)
• Wheel Lost: Ship steering damaged (movement penalties)
• Magazine Flooded: All guns disabled (shown in blue)
Y.8.4 PVN Surrender Penalties
Check the box at top of Damage tab to enable PVN-based surrender rules (6.95 & 6.96). When enabled, ships lose surrender points based on size ratios when fighting alone or unsupported. This makes single ships more likely to strike when heavily outnumbered.
Y.9 Boarding Tab
The Boarding tab manages close combat between grappled ships.
Y.9.1 Starting Boarding Actions
Before boarding can begin:
1. Ships must be grappled together (use Grapple button on Ships tab)
2. Wait one full turn after grappling
3. The Boarding tab will show available actions after the waiting period
Y.9.2 Four-Stage Boarding System
Boarding occurs in four stages:
1. Port Bulwark: Fight for control of the enemy ship's port side
2. Starboard Bulwark: Fight for control of the enemy ship's starboard side
3. First Half Deck: Advance into enemy ship interior
4. Second Half Deck: Complete capture of enemy vessel
Click each stage button to resolve that boarding action. The app calculates crew strengths, applies modifiers, and determines the winner. Green buttons show attacker victory, red shows defender victory. Capturing the Second Half Deck wins the entire ship.
 
Y.10 Crew Tab (Optional)
The Crew tab implements the optional crew assignment rules (M.0).
Y.10.1 Enabling Crew Assignment
Each ship has a checkbox "Use Crew Assignment". When checked, you must manually assign crew to three duties:
• Gun Crews: Personnel manning the cannons. Required crew shown automatically based on gun count.
• Sailing Crew: Personnel handling sails and rigging. Required crew shown automatically based on sail count.
• Fire Fighting: Personnel dedicated to fighting fires. Recommended 10% per active fire.
Y.10.2 How Crew Assignments Affect Gameplay
Insufficient gun crews: Gunnery effectiveness reduces (penalties shown in Gunnery tab)
Insufficient sailing crew: Movement speed reduces in 10% increments (see Movement tab). Zero sailing crew means ship can only drift.
Insufficient fire fighting: Fires spread faster and are harder to control
The app shows Total Assigned and Unassigned crew counts. If over-assigned (casualties reduced available crew), the app displays a warning in red.
Y.10.3 When to Use Crew Assignment
Crew assignment adds complexity and is optional. Use it when:
• Playing campaign games where crew management matters
• Simulating ships at reduced manning
• Playing scenarios with fire as a major threat
• You want maximum historical realism
For casual games, leave crew assignment disabled. The app uses default assumptions and you can ignore this tab entirely.
Y.11 Log Tab
The Log tab records every action during the battle.
Y.11.1 What Gets Logged
Every significant event appears in the log:
• Turn advances
• Gunnery actions (who fired, target, hits, damage)
• Damage application (hull damage, gun losses, crew casualties)
• Fires started, spread, or extinguished
• Masts destroyed
• Critical hits (rudder, wheel, magazine)
• Boarding actions and results
• Ships striking colors or being captured
• Ships sinking
Y.11.2 Using the Log
The log appears in reverse chronological order (newest first). Scroll through to review the entire battle. Color coding helps identify event types:
• Green: Successful actions
• Red: Critical damage or losses
• Orange: Warnings or fires
• Blue: Information or status changes
Use the log to:
• Verify actions if results seem unexpected
• Review the battle after completion
• Write battle reports or historical narratives
• Settle disputes about what happened when
Y.12 Tips for Effective Use
Save Often
Use Export after every few turns to save your game progress. Browser cache can clear unexpectedly. Saved files are small (typically under 100KB) and easy to organize by scenario name and date.
Measure Range Accurately
Gunnery calculations depend on exact range measurements. Measure center-to-center between ship models. A few centimeters difference can shift guns from Close to Medium range, dramatically affecting damage output.
Track Fires Immediately
When fires start, check the Damage tab and decide whether to organize a fire party. Fires aged 4+ turns risk magazine explosions. Don't wait too long to flood the magazine if fires are out of control.
Understand Surrender Points
Ships don't automatically strike at zero SP. The app shows SP = 0 but you decide when a ship surrenders. Some captains fight to the last, others strike early to save crew. Historical accuracy varies by navy and captain personality.
Use Point Values for Scenarios
The PVN (Point Value Number) helps balance forces. British ships might be worth much more points than for example  French ships due to crew quality. Create scenarios by total points) rather than gun counts for balanced  matchups.
Start Simple
For your first game, ignore optional systems:
• Keep Enhanced Fire disabled
• Skip crew assignment
• Don't use PVN surrender penalties
• Avoid boarding actions
Play a simple ship-to-ship duel (one frigate vs one frigate). Once comfortable with basic gunnery and movement, add complexity gradually.
Y.13 Troubleshooting
App Won't Load
Clear your browser cache and reload the page. Try a different browser if problems persist. The app requires JavaScript enabled.
Calculations Seem Wrong
Check the Log tab for detailed breakdown of all calculations. The app follows the rules but the results might differ from manual calculations due to rounding or modifier order. Trust the app unless you find a genuine bug.
Lost Ships After Browser Crash
If you didn't export your game, the data is lost. The app stores everything in browser memory, not on a server. Export regularly to avoid losing progress.
Can't Fire Guns
Check for: (1) Magazine flooded? (2) Heavy weather with two-decker ship? (3) All guns in that arc destroyed? (4) Insufficient gun crew if using crew assignment? The app disables firing when guns are unavailable.
Y.14 Getting Help
For bug reports, questions, or feature requests:
• Visit the GitHub repository: github.com/linusnapoleonicshipyard/Btq-companion-v8
• Contact via Linus Napoleonic Shipyard YouTube channel
• Check for updates regularly—the app is actively developed
Always use the latest version from the GitHub Pages link. Bug fixes and new features appear frequently during active development.
Y.15 Final Thoughts
The companion app is a calculator, not a replacement for understanding the rules. Read this rulebook thoroughly before relying on the app. Know why ships move at different speeds in different winds, understand why crew quality matters, and grasp the danger of uncontrolled fires.
The app eliminates tedious arithmetic and lets you focus on tactics: positioning, gunnery timing, crew management, and decisive moments like boarding actions or striking colors. Use it to enhance gameplay, not to avoid learning how Age of Sail combat works.
Traditional dice-and-tables play remains fully supported. Some gamers prefer the tactile experience of rolling dice and consulting charts. The companion app is optional—use it if it improves your experience, ignore it if you prefer the classic approach.
