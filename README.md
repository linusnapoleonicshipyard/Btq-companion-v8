# ⚓ BTQ Companion v8 - Complete Naval Wargaming Companion

A comprehensive digital companion for **Beat to Quarters** (Command Perspectives, 1981), the classic Age of Sail naval wargame. This version 8 includes complete rule systems with Enhanced Fire, Boarding Actions, and optional Crew Management.

![Version](https://img.shields.io/badge/version-8.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🚀 Quick Start

### Play Online
Visit [Your GitHub Pages URL] (after deployment)

### Run Locally
```bash
npm install
npm run dev
```

## ✨ Features

### Core Systems (v7)
- **Fleet Management**: Create and manage multiple ships with detailed stats
- **Movement Calculator**: Real-time speed calculation with wind, sail damage, and turn penalties
- **Gunnery System**: Complete firing mechanics with range, shot types, and target location
- **Damage Tracking**: Hull, sail, crew, masts, fires, and special damage
- **Fire Fighting**: Detailed fire combat with intensity levels and crew assignment
- **Wind System**: Dynamic wind strength and direction changes each turn
- **Save/Load**: Export and import game states as JSON files
- **Turn Management**: Undo functionality and complete action history

### Enhanced Systems (v8)

#### 🔥 Enhanced Fire (L.4)
- **Fire Spreading**: Wind-based fire propagation mechanics
- **Intensity Levels**: Minor → Major → Conflagration progression
- **Operational Effects**: 
  - Minor: -1 gun per side
  - Major: -2 guns per side, -25% speed, -20% gunnery accuracy (smoke)
  - Conflagration: All guns disabled, -50% speed
- **Magazine Management**: Flooding mechanics and explosion risks
- **Fire Parties**: Organized fire fighting bonuses and pump equipment

#### ⚔️ Boarding System (H.0)
- **Grappling**: 75% success chance with breakaway attempts
- **Area Control**: Sequential capture system
  1. Port/Starboard Bulwarks
  2. First Half Deck (requires both bulwarks)
  3. Second Half Deck (victory!)
- **Nationality Tables**: Historical boarding casualty rates
- **Soldier Bonuses**: Enhanced performance with embarked troops
- **Multiple Defenders**: Coordinated defense mechanics

#### 👥 Crew Assignment (M.0) - Optional
- **Gun Crews**: Detailed tracking with performance penalties
- **Sailing Crews**: Minimum requirements for full maneuverability
- **Fire Fighting**: Crew allocation for damage control
- **Performance Impact**:
  - Insufficient gun crews: -10% to -999% gunnery penalty
  - Insufficient sailing crew: 50% speed reduction
- **Auto-Assignment**: Smart crew distribution

## 📊 Complete Rule Implementation

### Included Rules
- ✅ Basic Movement (4.4)
- ✅ Sailing Speed Charts (all rates)
- ✅ Wind System with 32-point compass
- ✅ Gunnery Tables (15.91)
- ✅ Range Charts (6.12)
- ✅ Shot Types & Modifiers (6.4)
- ✅ Nationality Modifiers (6.17)
- ✅ Mortar Tables (6.86)
- ✅ Special Damage (6.5)
- ✅ Fire Fighting with intensity
- ✅ Surrender Points (6.95/6.98)
- ✅ Enhanced Fire System (L.4)
- ✅ Complete Boarding (H.0)
- ✅ Crew Assignment (M.0)

### Optional Rules Available
- Percent-based turn penalties (vs fixed 1pt)
- Initial broadside bonuses
- Crew assignment tracking
- Enhanced fire mechanics

## 🎮 How to Use

### 1. Setup
1. Create ships using the **Ships** tab
2. Configure nationality, crew quality, and armament
3. Set initial wind conditions

### 2. Each Turn
1. **Movement**: Calculate speeds accounting for damage
2. **Gunnery**: Fire at targets with appropriate modifiers
3. **Boarding**: Execute grappling and boarding actions if applicable
4. **Damage**: Apply results and check surrender conditions
5. **Advance Turn**: Wind changes and fire spreads automatically

### 3. Management
- **Export**: Save game state to JSON file
- **Import**: Load previous games
- **Restart Turn**: Undo last turn
- **Log**: View complete battle history

## 🎯 Game Controls

### Ships Tab
- Create new ships
- View fleet roster
- Manage ship details
- Grapple ships for boarding

### Movement Tab
- Calculate sailing speeds
- Apply damage modifiers
- Track position changes

### Gunnery Tab
- Select firing ship and target
- Choose range and shot type
- Apply nationality modifiers
- Track initial broadside bonuses
- Select target location (Port/Starboard/Bow/Stern)

### Boarding Tab
- View grappled ships
- Execute boarding actions
- Contest deck areas
- Track casualties

### Damage Tab
- Apply hull damage
- Record crew losses
- Manage fires
- Track special damage (wheel, rudder)
- Check surrender status

### Crew Tab (Optional)
- Assign gun crews
- Allocate sailing crews
- Dedicate fire fighting teams
- View performance penalties

### Log Tab
- Complete battle history
- Color-coded events
- Export action log

## 📁 Project Structure

```
btq-companion-v8/
├── src/
│   ├── App.jsx          # Main application
│   ├── main.jsx         # React entry point
│   └── index.css        # Tailwind styles
├── public/
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions deployment
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🚀 Deployment to GitHub Pages

### First Time Setup

1. **Create GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: BTQ Companion v8"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/btq-companion-v8.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `/ (root)`
   - Click Save

3. **Automatic Deployment**
   - GitHub Actions will automatically build and deploy on every push to `main`
   - View deployment progress in the Actions tab
   - Access your app at: `https://YOUR-USERNAME.github.io/btq-companion-v8/`

### Update Your App

```bash
git add .
git commit -m "Update: description of changes"
git push
```

GitHub Actions will automatically rebuild and redeploy!

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Commands

```bash
# Install dependencies
npm install

# Run development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages (manual)
npm run deploy
```

### Tech Stack
- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Styling
- **Lucide React**: Icons
- **GitHub Actions**: CI/CD
- **GitHub Pages**: Hosting

## 📖 Stats Explained

### Core Stats
- **HVN** (Hull Value Number): tonnage × 2
- **SVN** (Sail Value Number): Damage needed to lose a sail
- **GDN** (Gun Dismounting Number): Hull damage needed to lose a gun
- **SP** (Surrender Points): 10 base, 0 = ship strikes colors

### Modifiers
- **Crew Quality**: Affects gunnery accuracy and initial broadside
- **Nationality**: Historical combat performance modifiers
- **Wind**: Affects movement and fire spreading
- **Damage**: Cumulative penalties to all systems

## 🎨 Features in Detail

### Fire System
- Automatic spreading based on wind strength
- Progressive intensity with visual indicators
- Magazine explosion risk tracking
- Operational effects on combat capability
- Fire party efficiency calculations

### Boarding System
- Realistic grappling mechanics
- Historical nationality performance
- Sequential deck capture
- Coordinated defense options
- Victory conditions

### Crew Management
- Required vs available crew tracking
- Performance penalty calculations
- Auto-assignment algorithms
- Real-time availability display

## 📜 License

This is a fan-made companion app for the Beat to Quarters wargaming system.

Beat to Quarters is © Command Perspectives, 1981

## 🙏 Credits

- **Original Rules**: Command Perspectives (1981)
- **Enhanced Fire Rules**: BTQ House Rules L.4
- **Boarding System**: BTQ Rules Section H.0
- **Crew Assignment**: BTQ Optional Rules M.0
- **App Development**: Built with React and modern web technologies

## 🐛 Known Issues

- None currently reported

## 🔮 Future Enhancements

Potential features for v9:
- Multi-player support
- Fleet builder with historical OOBs
- Campaign mode
- Weather system
- Detailed rigging damage
- Prize crew mechanics

---

**Version**: 8.0.0  
**Last Updated**: October 2025  
**Status**: Complete and Ready for Deployment

For issues or suggestions, please open an issue on GitHub.
