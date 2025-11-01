import React, { useState } from 'react';
import { Ship, Wind, Plus, Trash2, Flame } from 'lucide-react';

const MAST_STRUCTURES = {
  'three-masted': {
    masts: ['Fore', 'Main', 'Mizzen', 'Bowsprit'],
    layouts: {
      10: [
        { name: 'Fore Course', mast: 'Fore', section: 0 },
        { name: 'Fore Topsail', mast: 'Fore', section: 1 },
        { name: 'Fore Topgallant', mast: 'Fore', section: 2 },
        { name: 'Main Course', mast: 'Main', section: 0 },
        { name: 'Main Topsail', mast: 'Main', section: 1 },
        { name: 'Main Topgallant', mast: 'Main', section: 2 },
        { name: 'Spanker', mast: 'Mizzen', section: 0 },
        { name: 'Mizzen Topsail', mast: 'Mizzen', section: 1 },
        { name: 'Mizzen Topgallant', mast: 'Mizzen', section: 2 },
        { name: 'Jib', mast: 'Bowsprit', section: 0 }
      ],
      9: [
        { name: 'Fore Course', mast: 'Fore', section: 0 },
        { name: 'Fore Topsail', mast: 'Fore', section: 1 },
        { name: 'Fore Topgallant', mast: 'Fore', section: 2 },
        { name: 'Main Course', mast: 'Main', section: 0 },
        { name: 'Main Topsail', mast: 'Main', section: 1 },
        { name: 'Main Topgallant', mast: 'Main', section: 2 },
        { name: 'Spanker', mast: 'Mizzen', section: 0 },
        { name: 'Mizzen Topsail', mast: 'Mizzen', section: 1 },
        { name: 'Jib', mast: 'Bowsprit', section: 0 }
      ],
      8: [
        { name: 'Fore Course', mast: 'Fore', section: 0 },
        { name: 'Fore Topsail', mast: 'Fore', section: 1 },
        { name: 'Fore Topgallant', mast: 'Fore', section: 2 },
        { name: 'Main Course', mast: 'Main', section: 0 },
        { name: 'Main Topsail', mast: 'Main', section: 1 },
        { name: 'Main Topgallant', mast: 'Main', section: 2 },
        { name: 'Spanker', mast: 'Mizzen', section: 0 },
        { name: 'Jib', mast: 'Bowsprit', section: 0 }
      ]
    }
  },
  'two-masted': {
    masts: ['Fore', 'Main', 'Bowsprit'],
    layouts: {
      7: [
        { name: 'Fore Course', mast: 'Fore', section: 0 },
        { name: 'Fore Topsail', mast: 'Fore', section: 1 },
        { name: 'Fore Topgallant', mast: 'Fore', section: 2 },
        { name: 'Main Course', mast: 'Main', section: 0 },
        { name: 'Main Topsail', mast: 'Main', section: 1 },
        { name: 'Main Topgallant', mast: 'Main', section: 2 },
        { name: 'Jib', mast: 'Bowsprit', section: 0 }
      ],
      6: [
        { name: 'Fore Course', mast: 'Fore', section: 0 },
        { name: 'Fore Topsail', mast: 'Fore', section: 1 },
        { name: 'Main Course', mast: 'Main', section: 0 },
        { name: 'Main Topsail', mast: 'Main', section: 1 },
        { name: 'Driver', mast: 'Main', section: 2 },
        { name: 'Jib', mast: 'Bowsprit', section: 0 }
      ],
      5: [
        { name: 'Fore Course', mast: 'Fore', section: 0 },
        { name: 'Fore Topsail', mast: 'Fore', section: 1 },
        { name: 'Main Course', mast: 'Main', section: 0 },
        { name: 'Main Topsail', mast: 'Main', section: 1 },
        { name: 'Jib', mast: 'Bowsprit', section: 0 }
      ],
      4: [
        { name: 'Fore Course', mast: 'Fore', section: 0 },
        { name: 'Fore Topsail', mast: 'Fore', section: 1 },
        { name: 'Main Course', mast: 'Main', section: 0 },
        { name: 'Main Topsail', mast: 'Main', section: 1 }
      ],
      3: [
        { name: 'Fore Course', mast: 'Fore', section: 0 },
        { name: 'Main Course', mast: 'Main', section: 0 },
        { name: 'Jib', mast: 'Bowsprit', section: 0 }
      ],
      2: [
        { name: 'Fore Course', mast: 'Fore', section: 0 },
        { name: 'Main Course', mast: 'Main', section: 0 }
      ]
    }
  },
  'single-masted': {
    masts: ['Main', 'Bowsprit'],
    layouts: {
      4: [
        { name: 'Main Course', mast: 'Main', section: 0 },
        { name: 'Main Topsail', mast: 'Main', section: 1 },
        { name: 'Main Topgallant', mast: 'Main', section: 2 },
        { name: 'Jib', mast: 'Bowsprit', section: 0 }
      ],
      2: [
        { name: 'Main Course', mast: 'Main', section: 0 },
        { name: 'Jib', mast: 'Bowsprit', section: 0 }
      ],
      1: [
        { name: 'Main Course', mast: 'Main', section: 0 }
      ]
    }
  }
};

const getMastStructure = (shipClass) => {
  if (shipClass.includes('1st') || shipClass.includes('2nd') || 
      shipClass.includes('3rd') || shipClass.includes('4th') || 
      shipClass.includes('5th') || shipClass.includes('6th')) {
    return 'three-masted';
  }
  if (shipClass.includes('Sloops') || shipClass.includes('Brigs') || 
      shipClass.includes('Snows') || shipClass.includes('Xebecs')) {
    return 'two-masted';
  }
  if (shipClass.includes('Cutters') || shipClass.includes('Gunboats') || 
      shipClass.includes('Trabacolos')) {
    return 'single-masted';
  }
  return 'two-masted';
};

const GUN_TYPES = [
  "48# Long", "42# Long", "36# Long", "32# Long", "30# Long", "29# Long",
  "24# Long", "18# Long", "12# Long", "9# Long", "8# Long", "6# Long", "4# Long", "3# Long",
  "68# Carronade", "42# Carronade", "36# Carronade", "32# Carronade", "24# Carronade",
  "18# Carronade", "12# Carronade"
];

const RANGE_BANDS = {
  "48# Long": { PB: [0, 2], Close: [2.1, 23], Medium: [23.1, 41], Long: [41.1, 63], Extreme: [63.1, 150] },
  "42# Long": { PB: [0, 2], Close: [2.1, 23], Medium: [23.1, 41], Long: [41.1, 63], Extreme: [63.1, 150] },
  "36# Long": { PB: [0, 2], Close: [2.1, 23], Medium: [23.1, 41], Long: [41.1, 63], Extreme: [63.1, 150] },
  "32# Long": { PB: [0, 2], Close: [2.1, 23], Medium: [23.1, 43], Long: [43.1, 66], Extreme: [66.1, 158] },
  "30# Long": { PB: [0, 2], Close: [2.1, 23], Medium: [23.1, 43], Long: [43.1, 66], Extreme: [66.1, 158] },
  "24# Long": { PB: [0, 2], Close: [2.1, 23], Medium: [23.1, 52], Long: [52.1, 79], Extreme: [79.1, 188] },
  "18# Long": { PB: [0, 2], Close: [2.1, 25], Medium: [25.1, 54], Long: [54.1, 82], Extreme: [82.1, 195] },
  "12# Long": { PB: [0, 2], Close: [2.1, 20], Medium: [20.1, 40], Long: [40.1, 60], Extreme: [60.1, 143] },
  "9# Long": { PB: [0, 2], Close: [2.1, 19], Medium: [19.1, 37], Long: [37.1, 57], Extreme: [57.1, 135] },
  "6# Long": { PB: [0, 2], Close: [2.1, 19], Medium: [19.1, 37], Long: [37.1, 57], Extreme: [57.1, 135] },
  "68# Carronade": { PB: [0, 2], Close: [2.1, 14], Medium: [14.1, 23], Long: [23.1, 35], Extreme: [35.1, 94] },
  "42# Carronade": { PB: [0, 2], Close: [2.1, 14], Medium: [14.1, 21], Long: [21.1, 32], Extreme: [32.1, 86] },
  "32# Carronade": { PB: [0, 2], Close: [2.1, 10], Medium: [10.1, 20], Long: [20.1, 30], Extreme: [30.1, 83] }
};

const RANGE_MODIFIERS = { PB: 1.0, Close: 1.0, Medium: 0.54, Long: 0.40, Extreme: 0.07 };
const SHOT_MODIFIERS = { Ball: 1.0, Double: 1.25, Dismantling: 2.5, Grape: 1.5, Canister: 2.5 };

const NATIONALITY_MODIFIERS = {
  "Denmark 1801": 0.65,
  "Denmark 1807": 0.76,
  "France - Royal Navy 1778-91": 0.91,
  "France - Republican Navy 1792-1801": 0.38,
  "France - Imperial Navy 1803-1815": 0.58,
  "France - Privateers 1792-1801": 0.34,
  "France - Privateers 1803-1815": 0.59,
  "Great Britain - Royal Navy 1775-1815": 1.00,
  "Great Britain - Captain Broke Shannon 1813": 1.14,
  "Great Britain - Mail Packets 1812-15": 0.44,
  "Hapsburg Empire": 0.42,
  "Kingdom of Italy 1803-1815": 0.45,
  "Kingdom of Naples 1806-15": 0.40,
  "Kingdom of Sardinia 1792-1801": 0.41,
  "Kingdom of Sardinia 1803-1815": 0.48,
  "Kingdom of the Two Sicilies 1792-1801": 0.40,
  "Kingdom of the Two Sicilies 1803-1815": 0.47,
  "Ottoman Empire 1792-1815": 0.15,
  "Portugal 1775-1801": 0.24,
  "Portugal 1803-15": 0.37,
  "Republic of Batavia 1796-1801": 0.43,
  "Republic of Batavia 1803-1814": 0.49,
  "Republic of Liguria": 0.27,
  "Republic of Venice 1792-1797": 0.45,
  "Russia 1788-1801": 0.44,
  "Russia 1803-15": 0.51,
  "Spain - Navy 1775-83": 0.36,
  "Spain - Navy 1792-1801": 0.41,
  "Spain - Navy 1803-1815": 0.48,
  "Spanish Privateers 1792-1801": 0.38,
  "Spanish Privateers 1803-1815": 0.44,
  "Sweden 1788-1801": 0.46,
  "Sweden 1803-1815": 0.54,
  "United Provinces of the Netherlands 1780-1795": 1.00,
  "U.S. Continental Navy 1775-1783": 0.50,
  "U.S. Navy 1798-1811": 0.90,
  "U.S. Navy 1812-15": 1.00,
  "U.S. Navy Lawrence Chesapeake 1813": 0.90
};

const GUN_CREW_SIZES = {
  "48# Long": 14, "42# Long": 14, "36# Long": 14, "32# Long": 12, "30# Long": 12, "29# Long": 12,
  "24# Long": 12, "18# Long": 8, "12# Long": 8, "9# Long": 6, "8# Long": 6, "6# Long": 4, "4# Long": 3, "3# Long": 3,
  "68# Carronade": 4, "42# Carronade": 4, "36# Carronade": 4, "32# Carronade": 3, 
  "24# Carronade": 3, "18# Carronade": 3, "12# Carronade": 3
};

const MOVEMENT_TABLES = {
  "1st & 2nd rates": {
    "Slight breeze": { QR: 90, Ru: 73, RN: 68, B: 46, D: 18 },
    "Light breeze": { QR: 181, Ru: 145, RN: 135, B: 90, D: 36 },
    "Gentle breeze": { QR: 247, Ru: 200, RN: 186, B: 124, D: 50 },
    "Moderate breeze": { QR: 318, Ru: 253, RN: 240, B: 158, D: 64 },
    "Fresh breeze": { QR: 453, Ru: 363, RN: 340, B: 228, D: 90 },
    "Gale": { QR: 272, Ru: 218, RN: 206, B: 136, D: 55 }
  },
  "3rd rates": {
    "Slight breeze": { QR: 101, Ru: 80, RN: 77, B: 50, D: 21 },
    "Light breeze": { QR: 203, Ru: 163, RN: 152, B: 101, D: 40 },
    "Gentle breeze": { QR: 272, Ru: 218, RN: 206, B: 136, D: 55 },
    "Moderate breeze": { QR: 340, Ru: 272, RN: 256, B: 172, D: 68 },
    "Fresh breeze": { QR: 475, Ru: 380, RN: 358, B: 240, D: 95 },
    "Gale": { QR: 272, Ru: 218, RN: 206, B: 136, D: 55 }
  },
  "4th rates": {
    "Slight breeze": { QR: 114, Ru: 90, RN: 86, B: 58, D: 24 },
    "Light breeze": { QR: 228, Ru: 181, RN: 173, B: 117, D: 46 },
    "Gentle breeze": { QR: 296, Ru: 235, RN: 223, B: 149, D: 61 },
    "Moderate breeze": { QR: 363, Ru: 290, RN: 272, B: 181, D: 73 },
    "Fresh breeze": { QR: 499, Ru: 395, RN: 374, B: 250, D: 105 },
    "Gale": { QR: 250, Ru: 200, RN: 189, B: 127, D: 50 }
  },
  "5th & 6th rates": {
    "Slight breeze": { QR: 225, Ru: 178, RN: 172, B: 114, D: 47 },
    "Light breeze": { QR: 268, Ru: 212, RN: 201, B: 136, D: 56 },
    "Gentle breeze": { QR: 389, Ru: 308, RN: 295, B: 198, D: 81 },
    "Moderate breeze": { QR: 485, Ru: 383, RN: 367, B: 247, D: 102 },
    "Fresh breeze": { QR: 586, Ru: 462, RN: 443, B: 299, D: 124 },
    "Gale": { QR: 268, Ru: 212, RN: 201, B: 136, D: 56 }
  },
  "Sloops (Corvettes) and Xebecs": {
    "Slight breeze": { QR: 207, Ru: 164, RN: 157, B: 105, D: 43 },
    "Light breeze": { QR: 268, Ru: 212, RN: 201, B: 136, D: 56 },
    "Gentle breeze": { QR: 451, Ru: 357, RN: 340, B: 229, D: 95 },
    "Moderate breeze": { QR: 586, Ru: 462, RN: 441, B: 299, D: 124 },
    "Fresh breeze": { QR: 537, Ru: 425, RN: 406, B: 272, D: 112 },
    "Gale": { QR: 207, Ru: 164, RN: 157, B: 105, D: 44 }
  },
  "Brigs, Snows, Pojamas, Gondolas, Ketches, Galleys, Polaccas": {
    "Slight breeze": { QR: 104, Ru: 81, RN: 78, B: 53, D: 22 },
    "Light breeze": { QR: 138, Ru: 110, RN: 104, B: 70, D: 30 },
    "Gentle breeze": { QR: 229, Ru: 181, RN: 173, B: 114, D: 49 },
    "Moderate breeze": { QR: 320, Ru: 250, RN: 240, B: 160, D: 70 },
    "Fresh breeze": { QR: 456, Ru: 364, RN: 342, B: 229, D: 92 },
    "Gale": { QR: 92, Ru: 73, RN: 70, B: 47, D: 18 }
  },
  "Trabacolos, Baghalas, Dohws, Schooners, Luggers, Cutters, Gunboats, Galivats, Proas, Batils, Colonial Trade Sloops": {
    "Slight breeze": { QR: 244, Ru: 192, RN: 183, B: 124, D: 50 },
    "Light breeze": { QR: 327, Ru: 259, RN: 247, B: 167, D: 70 },
    "Gentle breeze": { QR: 389, Ru: 308, RN: 295, B: 198, D: 81 },
    "Moderate breeze": { QR: 451, Ru: 357, RN: 340, B: 229, D: 95 },
    "Fresh breeze": { QR: 537, Ru: 425, RN: 406, B: 274, D: 112 },
    "Gale": { QR: 207, Ru: 164, RN: 157, B: 105, D: 44 }
  }
};

const WIND_STRENGTHS = ["Slight breeze", "Light breeze", "Gentle breeze", "Moderate breeze", "Fresh breeze", "Gale"];
const COMPASS_POINTS = ["N","N by E","NNE","NE by N","NE","NE by E","ENE","E by N","E","E by S","ESE","SE by E","SE","SE by S","SSE","S by E","S","S by W","SSW","SW by S","SW","SW by W","WSW","W by S","W","W by N","WNW","NW by W","NW","NW by N","NNW","N by W"];

const DEFAULT_SHIP_FORM = {
  name: 'HMS Victory',
  class: '1st & 2nd rates',
  tonnage: 2200,
  sails: 10,
  crew: 850,
  crewQuality: 'Experienced',
  nationality: 'Great Britain - Royal Navy 1775-1815',
  guns: [{ type: '32# Long', poundage: 32, count: 60 }],
  bowChasers: { type: '12# Long', poundage: 12, count: 2 },
  sternChasers: { type: '12# Long', poundage: 12, count: 2 }
};

export default function BTQCompanion() {
  const [activeTab, setActiveTab] = useState('ships');
  const [ships, setShips] = useState([]);
  const [shipForm, setShipForm] = useState(DEFAULT_SHIP_FORM);
  const [turn, setTurn] = useState(1);
  const [wind, setWind] = useState({ strength: 'Gentle breeze', direction: 'N' });
  const [log, setLog] = useState([]);
  const [shipAddedMessage, setShipAddedMessage] = useState('');
  const [usePercentTurnPenalty, setUsePercentTurnPenalty] = useState(false);
  const [gunneryForm, setGunneryForm] = useState({
    firingShipId: '',
    targetShipId: '',
    arc: 'Port',
    targetLocation: 'Port',
    distance: 10,
    shotType: 'Ball',
    aimType: 'Hull',
    rakeType: 'None',
    useInitialBroadside: true
  });
  const [lastGunneryResult, setLastGunneryResult] = useState(null);
  const [previousTurnState, setPreviousTurnState] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showRestartConfirm, setShowRestartConfirm] = useState(false);

  const addLog = (message, type = 'info') => {
    setLog(prev => [...prev, { id: Date.now() + Math.random(), message, type, turn }]);
  };

  const calculateDerivedStats = (form) => {
    const hvn = form.tonnage * 2;
    const svn = Math.round(hvn / (1.3 * form.sails));
    const totalGuns = form.guns.reduce((sum, g) => sum + g.count, 0) + 
                      form.bowChasers.count + form.sternChasers.count;
    const gdn = Math.round((totalGuns * hvn) / 1000);
    const totalPoundage = form.guns.reduce((sum, g) => sum + (g.poundage * g.count), 0);
    const lgbwn = Math.round(totalPoundage / 4);
    const cbwn = Math.round(hvn / 40);
    const pvn = Math.round(hvn / 400);
    return { hvn, svn, gdn, lgbwn, cbwn, pvn };
  };

  const getRangeBand = (gunType, distance) => {
    const bands = RANGE_BANDS[gunType];
    if (!bands) return 'Out of Range';
    if (distance <= bands.PB[1]) return 'PB';
    if (distance <= bands.Close[1]) return 'Close';
    if (distance <= bands.Medium[1]) return 'Medium';
    if (distance <= bands.Long[1]) return 'Long';
    if (distance <= bands.Extreme[1]) return 'Extreme';
    return 'Out of Range';
  };

  const canFireShot = (shotType, rangeBand, aimType) => {
    if (shotType === 'Dismantling' && aimType !== 'Rigging') return false;
    if ((shotType === 'Grape' || shotType === 'Canister') && aimType !== 'Crew') return false;
    if (rangeBand === 'Long' || rangeBand === 'Extreme') {
      if (shotType === 'Double' || shotType === 'Dismantling') return false;
    }
    if (rangeBand === 'Medium' || rangeBand === 'Long' || rangeBand === 'Extreme') {
      if (shotType === 'Grape' || shotType === 'Canister') return false;
    }
    return true;
  };

  const executeGunnery = () => {
    const firingShip = ships.find(s => s.id === gunneryForm.firingShipId);
    const targetShip = ships.find(s => s.id === gunneryForm.targetShipId);

    if (!firingShip || !targetShip) {
      addLog('⚠️ Select both ships', 'error');
      return;
    }

    const { arc, targetLocation, distance, shotType, aimType, rakeType, useInitialBroadside } = gunneryForm;

    const availableGuns = firingShip.arcs[arc]?.filter(g => g.count > 0) || [];
    if (availableGuns.length === 0) {
      addLog(`⚠️ No guns in ${arc} arc`, 'error');
      return;
    }

    if (rakeType !== 'None' && shotType !== 'Ball') {
      addLog('⚠️ Raking requires Ball shot', 'error');
      return;
    }

    if (rakeType !== 'None' && distance > 19) {
      addLog('⚠️ Raking requires ≤19cm', 'error');
      return;
    }

    const ibAvailable = useInitialBroadside && 
                        firingShip.crewQuality === 'Experienced' && 
                        firingShip.initialBroadside[arc];

    const ngm = NATIONALITY_MODIFIERS[firingShip.nationality] || 1.0;
    const shotMod = SHOT_MODIFIERS[shotType] || 1.0;
    const rakeMod = rakeType === 'Bow' ? 1.1 : rakeType === 'Stern' ? 1.25 : 1.0;
    
    let totalHits = 0;
    let totalDamage = 0;

    availableGuns.forEach(gun => {
      const rangeBand = getRangeBand(gun.type, distance);
      if (rangeBand === 'Out of Range') return;
      if (!canFireShot(shotType, rangeBand, aimType)) return;

      let roll = (Math.floor(Math.random() * 100) + 1) / 100;

      if (ibAvailable) roll = Math.min(1.0, roll + 0.50);
      if (rangeBand === 'Close') roll = Math.min(1.0, roll + 0.13);

      const rangeModifier = rangeBand === 'PB' ? 1.0 : RANGE_MODIFIERS[rangeBand];
      const hits = rangeBand === 'PB' ? gun.count : roll * rangeModifier * gun.count;
      const damage = hits * gun.poundage * ngm * shotMod * rakeMod;
      
      totalHits += hits;
      totalDamage += damage;
    });

    if (totalHits === 0) {
      addLog('⚠️ No guns could fire', 'error');
      return;
    }

    totalDamage = Math.round(totalDamage);

    let actualAimType = aimType;
    if (aimType === 'Hull') {
      const rangeBand = getRangeBand(availableGuns[0].type, distance);
      let sailHitChance = 0;
      
      if (rangeBand === 'Medium') sailHitChance = 0.15;
      else if (rangeBand === 'Long') sailHitChance = 0.30;
      else if (rangeBand === 'Extreme') sailHitChance = 0.50;
      
      if (sailHitChance > 0 && Math.random() < sailHitChance) {
        actualAimType = 'Rigging';
        addLog(`🎯 Hull shot hit rigging instead! (${Math.round(sailHitChance * 100)}% chance at range)`, 'info');
      }
    }

    let crewLost = 0;
    if (actualAimType === 'Crew') {
      crewLost = Math.floor(totalDamage / 3);
    }

    if (ibAvailable) {
      setShips(prevShips => prevShips.map(s => {
        if (s.id === firingShip.id) {
          return {
            ...s,
            initialBroadside: { ...s.initialBroadside, [arc]: false }
          };
        }
        return s;
      }));
    }

    const result = {
      totalHits: totalHits.toFixed(1),
      totalDamage,
      crewLost,
      aimType: actualAimType,
      shotType,
      rakeType,
      firingShip: firingShip.name,
      targetShip: targetShip.name,
      targetShipId: targetShip.id,
      arc,
      targetLocation,
      distance,
      ibUsed: ibAvailable
    };

    setLastGunneryResult(result);
    addLog(`💥 ${firingShip.name} fires at ${targetLocation}: ${totalHits.toFixed(1)} hits, ${totalDamage} dmg`, 'success');
  };

  const applySailDamage = (ship, damage) => {
    const updatedShip = { ...ship };
    let damageLog = [];
    
    updatedShip.sailDamage += damage;
    
    while (updatedShip.sailDamage >= updatedShip.svn) {
      updatedShip.sailDamage -= updatedShip.svn;
      
      const remainingSails = updatedShip.sailLayout.filter(s => 
        !updatedShip.sailsLost.some(lost => lost.name === s.name)
      );
      
      if (remainingSails.length === 0) {
        damageLog.push('⛵ All sails destroyed!');
        break;
      }
      
      const randomSail = remainingSails[Math.floor(Math.random() * remainingSails.length)];
      updatedShip.sailsLost.push(randomSail);
      damageLog.push(`⛵ Lost: ${randomSail.name}`);
      
      if (Math.random() <= 0.35) {
        const mastSectionKey = `${randomSail.mast}-${randomSail.section}`;
        if (!updatedShip.mastSectionsLost.includes(mastSectionKey)) {
          updatedShip.mastSectionsLost.push(mastSectionKey);
          damageLog.push(`💥 Mast section destroyed: ${randomSail.mast} section ${randomSail.section}`);
          
          const cascadeSails = updatedShip.sailLayout.filter(s => 
            s.mast === randomSail.mast && 
            s.section > randomSail.section &&
            !updatedShip.sailsLost.some(lost => lost.name === s.name)
          );
          
          if (cascadeSails.length > 0) {
            cascadeSails.forEach(sail => {
              updatedShip.sailsLost.push(sail);
              damageLog.push(`  ↳ Cascade: ${sail.name}`);
            });
          }
          
          const totalSections = updatedShip.sailLayout.length;
          const mastSectionLossPct = Math.floor((updatedShip.mastSectionsLost.length / totalSections) * 100);
          const spFromMastSections = Math.floor(mastSectionLossPct / 10);
          const oldSP = updatedShip.sp;
          updatedShip.sp = Math.max(0, 10 - spFromMastSections);
          const spLoss = oldSP - updatedShip.sp;
          
          if (spLoss > 0) {
            damageLog.push(`📊 -${spLoss} SP (${updatedShip.mastSectionsLost.length}/${totalSections} mast sections lost)`);
          }
        }
      }
    }
    
    return { ship: updatedShip, log: damageLog };
  };

  const applyHullDamage = (ship, damage, targetLocation) => {
    const updatedShip = { ...ship };
    let damageLog = [];
    
    updatedShip.hullDamage += damage;
    updatedShip.gdnCarry += damage;
    
    const hullPct = Math.floor((updatedShip.hullDamage / updatedShip.hvn) * 100);
    const oldHullPct = Math.floor(((updatedShip.hullDamage - damage) / updatedShip.hvn) * 100);
    
    const spLoss = Math.floor(hullPct / 5) - Math.floor(oldHullPct / 5);
    if (spLoss > 0) {
      updatedShip.sp = Math.max(0, updatedShip.sp - spLoss);
      damageLog.push(`📊 -${spLoss} SP (${hullPct}% hull)`);
      
      for (let i = 0; i < spLoss; i++) {
        const roll = Math.floor(Math.random() * 100) + 1;
        if (roll === 1) {
          updatedShip.fires.push({ id: Date.now() + Math.random(), age: 1 });
          damageLog.push(`🔥 FIRE! (-1 SP)`);
          updatedShip.sp = Math.max(0, updatedShip.sp - 1);
        } else if (roll >= 2 && roll <= 3) {
          if (!updatedShip.rudder) {
            updatedShip.rudder = true;
            updatedShip.sp = Math.max(0, updatedShip.sp - 2);
            damageLog.push(`🎯 RUDDER! (-2 SP)`);
          }
        } else if (roll >= 4 && roll <= 5) {
          if (!updatedShip.wheel) {
            updatedShip.wheel = true;
            updatedShip.sp = Math.max(0, updatedShip.sp - 1);
            damageLog.push(`🎯 WHEEL! (-1 SP)`);
          }
        }
      }
    }
    
    while (updatedShip.gdnCarry >= updatedShip.gdn) {
      updatedShip.gdnCarry -= updatedShip.gdn;
      
      let arcToHit;
      if (targetLocation === 'Port' || targetLocation === 'Starboard') {
        arcToHit = targetLocation;
      } else {
        arcToHit = Math.random() < 0.5 ? 'Port' : 'Starboard';
      }
      
      const availableGuns = updatedShip.arcs[arcToHit].filter(g => g.count > 0);
      if (availableGuns.length === 0) continue;
      
      const randomGunGroup = availableGuns[Math.floor(Math.random() * availableGuns.length)];
      const gunIndex = updatedShip.arcs[arcToHit].findIndex(g => g === randomGunGroup);
      
      updatedShip.arcs[arcToHit][gunIndex] = {
        ...randomGunGroup,
        count: randomGunGroup.count - 1
      };
      
      const crewSize = GUN_CREW_SIZES[randomGunGroup.type] || 4;
      const crewLoss = Math.floor(Math.random() * crewSize);
      updatedShip.crewLoss += crewLoss;
      
      damageLog.push(`💥 Gun lost: ${randomGunGroup.type} (${arcToHit}) → ${crewLoss} crew`);
    }
    
    return { ship: updatedShip, log: damageLog };
  };

  const applyCrewDamage = (ship, casualties) => {
    const updatedShip = { ...ship };
    updatedShip.crewLoss += casualties;
    return {
      ship: updatedShip,
      log: [`💀 ${casualties} casualties`]
    };
  };

  const applyDamage = () => {
    if (!lastGunneryResult) return;
    
    const targetShipId = lastGunneryResult.targetShipId;
    const damage = lastGunneryResult.totalDamage;
    const aimType = lastGunneryResult.aimType;
    const targetLocation = lastGunneryResult.targetLocation;
    
    setShips(prevShips => prevShips.map(s => {
      if (s.id !== targetShipId) return s;
      
      let result;
      let allLogs = [];
      
      if (aimType === 'Rigging') {
        result = applySailDamage(s, damage);
        allLogs = result.log;
      } else if (aimType === 'Hull') {
        result = applyHullDamage(s, damage, targetLocation);
        allLogs = result.log;
      } else if (aimType === 'Crew') {
        const casualties = Math.floor(damage / 3);
        result = applyCrewDamage(s, casualties);
        allLogs = result.log;
      }
      
      allLogs.forEach(msg => addLog(`${s.name}: ${msg}`, 'error'));
      
      if (result.ship.sp === 0 && s.sp > 0) {
        addLog(`⚑ ${s.name} STRIKES COLORS! (0 SP)`, 'error');
      }
      
      return result.ship;
    }));
    
    addLog('✅ Damage applied', 'success');
  };

  const advanceTurn = () => {
    setPreviousTurnState({
      ships: JSON.parse(JSON.stringify(ships)),
      turn,
      wind: { ...wind },
      log: [...log]
    });
    
    const updatedShips = ships.map(ship => {
      if (ship.fires.length === 0) return ship;
      
      const updatedFires = ship.fires.map(fire => {
        const newAge = fire.age + 1;
        const roll = Math.random() * 100;
        let extinguishChance;
        
        if (newAge === 1) {
          extinguishChance = ship.crewQuality === 'Experienced' ? 62 : 52;
        } else if (newAge === 2) {
          extinguishChance = ship.crewQuality === 'Experienced' ? 44 : 34;
        } else {
          extinguishChance = ship.crewQuality === 'Experienced' ? 29 : 19;
        }
        
        if (roll <= extinguishChance) {
          addLog(`🔥 ${ship.name}: Fire out!`, 'success');
          return null;
        }
        
        return { ...fire, age: newAge };
      }).filter(f => f !== null);
      
      let fireHullDamage = 0;
      updatedFires.forEach(fire => {
        if (fire.age >= 4) {
          const fivePctHull = Math.round(ship.hvn * 0.05);
          fireHullDamage += fivePctHull;
        }
      });
      
      if (fireHullDamage > 0) {
        addLog(`🔥 ${ship.name}: Fire burns ${fireHullDamage} hull!`, 'error');
      }
      
      return {
        ...ship,
        fires: updatedFires,
        hullDamage: ship.hullDamage + fireHullDamage
      };
    });
    
    setShips(updatedShips);
    setTurn(prev => prev + 1);
    
    if (turn % 10 === 0) {
      const strengthRoll = Math.floor(Math.random() * 100) + 1;
      const currentStrengthIdx = WIND_STRENGTHS.indexOf(wind.strength);
      
      if (strengthRoll <= 25 && currentStrengthIdx > 0) {
        const newStrength = WIND_STRENGTHS[currentStrengthIdx - 1];
        setWind(prev => ({ ...prev, strength: newStrength }));
        addLog(`💨 Wind drops to ${newStrength}`, 'info');
      } else if (strengthRoll >= 76 && currentStrengthIdx < WIND_STRENGTHS.length - 1) {
        const newStrength = WIND_STRENGTHS[currentStrengthIdx + 1];
        setWind(prev => ({ ...prev, strength: newStrength }));
        addLog(`💨 Wind increases to ${newStrength}`, 'info');
      }
      
      const directionRoll = Math.floor(Math.random() * 100) + 1;
      const dirIdx = COMPASS_POINTS.indexOf(wind.direction);
      
      if (directionRoll <= 5) {
        const newIdx = (dirIdx + 8) % 32;
        setWind(prev => ({ ...prev, direction: COMPASS_POINTS[newIdx] }));
        addLog(`💨 Wind shifts 8 pts RIGHT to ${COMPASS_POINTS[newIdx]}`, 'info');
      } else if (directionRoll <= 10) {
        const newIdx = (dirIdx - 8 + 32) % 32;
        setWind(prev => ({ ...prev, direction: COMPASS_POINTS[newIdx] }));
        addLog(`💨 Wind shifts 8 pts LEFT to ${COMPASS_POINTS[newIdx]}`, 'info');
      } else if (directionRoll <= 30) {
        const newIdx = (dirIdx + 4) % 32;
        setWind(prev => ({ ...prev, direction: COMPASS_POINTS[newIdx] }));
        addLog(`💨 Wind shifts 4 pts RIGHT to ${COMPASS_POINTS[newIdx]}`, 'info');
      } else if (directionRoll <= 50) {
        const newIdx = (dirIdx - 4 + 32) % 32;
        setWind(prev => ({ ...prev, direction: COMPASS_POINTS[newIdx] }));
        addLog(`💨 Wind shifts 4 pts LEFT to ${COMPASS_POINTS[newIdx]}`, 'info');
      }
    }
    
    addLog(`Turn ${turn + 1} begins`, 'info');
  };

  const startNewGame = () => {
    if (ships.length > 0) {
      setShowResetConfirm(true);
      return;
    }
    performReset();
  };

  const performReset = () => {
    setShips([]);
    setTurn(1);
    setWind({ strength: 'Gentle breeze', direction: 'N' });
    setLog([]);
    setLastGunneryResult(null);
    setPreviousTurnState(null);
    setShipForm({ ...DEFAULT_SHIP_FORM });
    setShowResetConfirm(false);
    addLog('🎮 New game started', 'success');
  };

  const restartTurn = () => {
    if (!previousTurnState) {
      addLog('⚠️ No previous turn to restart', 'error');
      return;
    }
    setShowRestartConfirm(true);
  };

  const performRestart = () => {
    setShips(previousTurnState.ships);
    setTurn(previousTurnState.turn);
    setWind(previousTurnState.wind);
    setLog(previousTurnState.log);
    setPreviousTurnState(null);
    setShowRestartConfirm(false);
    addLog('↩️ Turn restarted', 'info');
  };

  const exportGame = () => {
    const gameState = {
      version: 'BTQ-v7',
      timestamp: new Date().toISOString(),
      ships,
      turn,
      wind,
      log,
      usePercentTurnPenalty
    };
    
    const dataStr = JSON.stringify(gameState, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const filename = `btq-save-turn${turn}-${Date.now()}.json`;
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => URL.revokeObjectURL(url), 100);
    
    addLog(`💾 Game exported: ${filename}`, 'success');
  };

  const importGame = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const gameState = JSON.parse(e.target.result);
        
        if (!gameState.version || !gameState.ships) {
          throw new Error('Invalid save file');
        }
        
        setShips(gameState.ships || []);
        setTurn(gameState.turn || 1);
        setWind(gameState.wind || { strength: 'Gentle breeze', direction: 'N' });
        setLog(gameState.log || []);
        setUsePercentTurnPenalty(gameState.usePercentTurnPenalty || false);
        setPreviousTurnState(null);
        setLastGunneryResult(null);
        
        setGunneryForm({
          firingShipId: '',
          targetShipId: '',
          arc: 'Port',
          targetLocation: 'Port',
          distance: 10,
          shotType: 'Ball',
          aimType: 'Hull',
          rakeType: 'None',
          useInitialBroadside: true
        });
        
        addLog('📂 Game loaded', 'success');
      } catch (error) {
        addLog(`⚠️ Import failed: ${error.message}`, 'error');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const addGunGroup = () => {
    setShipForm(prev => ({
      ...prev,
      guns: [...prev.guns, { type: '18# Long', poundage: 18, count: 10 }]
    }));
  };

  const removeGunGroup = (index) => {
    setShipForm(prev => ({
      ...prev,
      guns: prev.guns.filter((_, i) => i !== index)
    }));
  };

  const updateGunGroup = (index, field, value) => {
    setShipForm(prev => ({
      ...prev,
      guns: prev.guns.map((g, i) => {
        if (i !== index) return g;
        const updated = { ...g, [field]: value };
        if (field === 'type') {
          updated.poundage = parseInt(value.match(/\d+/)[0]);
        }
        return updated;
      })
    }));
  };

  const getTurnCap = (shipClass) => {
    if (shipClass.includes('1st') || shipClass.includes('2nd')) return 3;
    if (shipClass.includes('3rd')) return 5;
    if (shipClass.includes('4th')) return 7;
    if (shipClass.includes('5th') || shipClass.includes('6th')) return 8;
    if (shipClass.includes('Sloops') || shipClass.includes('Xebecs')) return 9;
    if (shipClass.includes('Brigs') || shipClass.includes('Snows')) return 9;
    return 10;
  };

  const testMovement = (ship) => {
    const table = MOVEMENT_TABLES[ship.class];
    if (!table) return null;
    
    const speeds = table[wind.strength];
    if (!speeds) return null;

    const base = speeds[ship.pos];
    const sailLossPct = (ship.sailsLost.length / ship.sails) * 100;
    const sailPenalty = Math.round(base * sailLossPct / 100);
    
    const turnPenalty = usePercentTurnPenalty 
      ? Math.round(base * 0.05 * ship.turnPoints)
      : 15 * ship.turnPoints;
    
    const maxSpeed = Math.max(0, base - sailPenalty - turnPenalty);
    const minSpeed = ship.lastMove > 0 ? Math.floor(ship.lastMove * 0.5) : 0;
    const maxCap = ship.lastMove > 0 ? ship.lastMove * 2 : maxSpeed;
    
    const allowedMin = Math.max(minSpeed, 0);
    const allowedMax = Math.min(maxSpeed, maxCap);
    
    return {
      base,
      maxSpeed,
      allowedRange: `${allowedMin} - ${allowedMax}mm`
    };
  };

  const createShip = () => {
    if (!shipForm.name) {
      addLog('⚠️ Name required', 'error');
      return;
    }

    const derived = calculateDerivedStats(shipForm);
    const mastStructure = getMastStructure(shipForm.class);
    const sailLayout = MAST_STRUCTURES[mastStructure].layouts[shipForm.sails] || 
                       MAST_STRUCTURES[mastStructure].layouts[Object.keys(MAST_STRUCTURES[mastStructure].layouts)[0]];
    
    const arcs = { Port: [], Starboard: [], Bow: [], Stern: [] };

    shipForm.guns.forEach(gun => {
      const halfCount = Math.floor(gun.count / 2);
      const remainder = gun.count % 2;
      
      arcs.Port.push({
        type: gun.type,
        poundage: gun.poundage,
        count: halfCount + remainder
      });
      
      arcs.Starboard.push({
        type: gun.type,
        poundage: gun.poundage,
        count: halfCount
      });
    });

    if (shipForm.bowChasers.count > 0) {
      arcs.Bow.push(shipForm.bowChasers);
    }

    if (shipForm.sternChasers.count > 0) {
      arcs.Stern.push(shipForm.sternChasers);
    }

    const newShip = {
      id: `ship_${Date.now()}`,
      name: shipForm.name,
      class: shipForm.class,
      tonnage: shipForm.tonnage,
      sails: shipForm.sails,
      crew: shipForm.crew,
      crewQuality: shipForm.crewQuality,
      nationality: shipForm.nationality,
      ...derived,
      arcs,
      mastStructure,
      sailLayout,
      hullDamage: 0,
      sailDamage: 0,
      crewLoss: 0,
      sp: 10,
      fires: [],
      wheel: false,
      rudder: false,
      gdnCarry: 0,
      sailsLost: [],
      mastSectionsLost: [],
      lastMove: 0,
      turnPoints: 0,
      pos: 'Ru',
      initialBroadside: { Port: true, Starboard: true, Bow: true, Stern: true }
    };

    setShips(prev => [...prev, newShip]);
    addLog(`✅ ${newShip.name} added`, 'success');
    setShipAddedMessage(`✓ ${newShip.name} added!`);
    setTimeout(() => setShipAddedMessage(''), 3000);
    setShipForm({ ...DEFAULT_SHIP_FORM });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-2">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-800 rounded-lg p-3 mb-2 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Ship className="w-5 h-5 text-blue-400" />
              <h1 className="text-base font-bold">BTQ v7</h1>
              <div className="px-2 py-0.5 bg-slate-700 rounded text-xs">T{turn}</div>
              {ships.length > 0 && (
                <div className="px-2 py-0.5 bg-blue-900 rounded text-xs">{ships.length}</div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-cyan-400" />
              <select
                value={wind.strength}
                onChange={(e) => setWind(prev => ({ ...prev, strength: e.target.value }))}
                className="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs"
              >
                {WIND_STRENGTHS.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
              <select
                value={wind.direction}
                onChange={(e) => setWind(prev => ({ ...prev, direction: e.target.value }))}
                className="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs"
              >
                {COMPASS_POINTS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <button onClick={advanceTurn} className="px-2 py-1 bg-green-600 hover:bg-green-700 rounded text-xs font-bold">
                Next
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2 justify-end">
            <button 
              onClick={startNewGame}
              className="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs"
            >
              🎮 New
            </button>
            <button 
              onClick={restartTurn}
              disabled={!previousTurnState}
              className={`px-2 py-1 rounded text-xs ${
                previousTurnState 
                  ? 'bg-yellow-600 hover:bg-yellow-700' 
                  : 'bg-slate-600 cursor-not-allowed opacity-50'
              }`}
            >
              ↩️ Restart
            </button>
            <button 
              onClick={exportGame}
              disabled={ships.length === 0}
              className={`px-2 py-1 rounded text-xs ${
                ships.length > 0
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : 'bg-slate-600 cursor-not-allowed opacity-50'
              }`}
            >
              💾 Export
            </button>
            <label className={`px-2 py-1 rounded text-xs cursor-pointer ${'bg-orange-600 hover:bg-orange-700'}`}>
              📂 Import
              <input
                type="file"
                accept=".json"
                onChange={importGame}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {showResetConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-lg p-4 border-2 border-red-600 max-w-sm">
              <h3 className="text-lg font-bold text-red-400 mb-2">⚠️ Reset Game?</h3>
              <p className="text-slate-300 mb-4 text-sm">All progress will be lost. Are you sure?</p>
              <div className="flex gap-2">
                <button
                  onClick={performReset}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded font-bold text-sm"
                >
                  Yes, Reset
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 px-4 py-2 bg-slate-600 hover:bg-slate-700 rounded font-bold text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showRestartConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-lg p-4 border-2 border-yellow-600 max-w-sm">
              <h3 className="text-lg font-bold text-yellow-400 mb-2">↩️ Restart Turn?</h3>
              <p className="text-slate-300 mb-4 text-sm">Go back to the previous turn?</p>
              <div className="flex gap-2">
                <button
                  onClick={performRestart}
                  className="flex-1 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded font-bold text-sm"
                >
                  Yes, Restart
                </button>
                <button
                  onClick={() => setShowRestartConfirm(false)}
                  className="flex-1 px-4 py-2 bg-slate-600 hover:bg-slate-700 rounded font-bold text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-1 mb-2 overflow-x-auto">
          {['ships', 'movement', 'gunnery', 'damage', 'log'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                activeTab === tab ? 'bg-blue-600' : 'bg-slate-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'ships' && (
          <div className="space-y-2">
            <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
              <h2 className="text-sm font-bold mb-2">Create Ship</h2>
              
              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Name</label>
                  <input
                    value={shipForm.name}
                    onChange={(e) => setShipForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Class</label>
                    <select
                      value={shipForm.class}
                      onChange={(e) => setShipForm(prev => ({ ...prev, class: e.target.value }))}
                      className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs"
                    >
                      {Object.keys(MOVEMENT_TABLES).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Tonnage</label>
                    <input
                      type="number"
                      value={shipForm.tonnage}
                      onChange={(e) => setShipForm(prev => ({ ...prev, tonnage: parseInt(e.target.value) }))}
                      className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Sails</label>
                    <select
                      value={shipForm.sails}
                      onChange={(e) => setShipForm(prev => ({ ...prev, sails: parseInt(e.target.value) }))}
                      className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs"
                    >
                      {[10,9,8,7,6,5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Crew</label>
                    <input
                      type="number"
                      value={shipForm.crew}
                      onChange={(e) => setShipForm(prev => ({ ...prev, crew: parseInt(e.target.value) }))}
                      className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Quality</label>
                    <select
                      value={shipForm.crewQuality}
                      onChange={(e) => setShipForm(prev => ({ ...prev, crewQuality: e.target.value }))}
                      className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs"
                    >
                      <option>Experienced</option>
                      <option>Inexperienced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Nationality</label>
                    <select
                      value={shipForm.nationality}
                      onChange={(e) => setShipForm(prev => ({ ...prev, nationality: e.target.value }))}
                      className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs"
                    >
                      {Object.entries(NATIONALITY_MODIFIERS).map(([nat, mod]) => (
                        <option key={nat} value={nat}>{nat.slice(0, 30)} ({mod})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs text-slate-400">Broadside Guns</label>
                    <button onClick={addGunGroup} className="px-2 py-0.5 bg-blue-600 rounded text-xs flex items-center gap-1">
                      <Plus className="w-3 h-3" /> Add
                    </button>
                  </div>
                  {shipForm.guns.map((gun, idx) => (
                    <div key={idx} className="flex gap-1 mb-1">
                      <select
                        value={gun.type}
                        onChange={(e) => updateGunGroup(idx, 'type', e.target.value)}
                        className="flex-1 bg-slate-700 border border-slate-600 rounded px-1 py-1 text-xs"
                      >
                        {GUN_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <input
                        type="number"
                        value={gun.count}
                        onChange={(e) => updateGunGroup(idx, 'count', parseInt(e.target.value))}
                        className="w-12 bg-slate-700 border border-slate-600 rounded px-1 py-1 text-xs"
                      />
                      <button onClick={() => removeGunGroup(idx)} className="px-1 bg-red-600 rounded">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Bow Chasers</label>
                    <div className="flex gap-1">
                      <select
                        value={shipForm.bowChasers.type}
                        onChange={(e) => setShipForm(prev => ({ 
                          ...prev, 
                          bowChasers: { ...prev.bowChasers, type: e.target.value, poundage: parseInt(e.target.value.match(/\d+/)[0]) }
                        }))}
                        className="flex-1 bg-slate-700 border border-slate-600 rounded px-1 py-1 text-xs"
                      >
                        {GUN_TYPES.slice(0, 14).map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <input
                        type="number"
                        value={shipForm.bowChasers.count}
                        onChange={(e) => setShipForm(prev => ({ 
                          ...prev, 
                          bowChasers: { ...prev.bowChasers, count: parseInt(e.target.value) }
                        }))}
                        className="w-10 bg-slate-700 border border-slate-600 rounded px-1 py-1 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Stern Chasers</label>
                    <div className="flex gap-1">
                      <select
                        value={shipForm.sternChasers.type}
                        onChange={(e) => setShipForm(prev => ({ 
                          ...prev, 
                          sternChasers: { ...prev.sternChasers, type: e.target.value, poundage: parseInt(e.target.value.match(/\d+/)[0]) }
                        }))}
                        className="flex-1 bg-slate-700 border border-slate-600 rounded px-1 py-1 text-xs"
                      >
                        {GUN_TYPES.slice(0, 14).map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <input
                        type="number"
                        value={shipForm.sternChasers.count}
                        onChange={(e) => setShipForm(prev => ({ 
                          ...prev, 
                          sternChasers: { ...prev.sternChasers, count: parseInt(e.target.value) }
                        }))}
                        className="w-10 bg-slate-700 border border-slate-600 rounded px-1 py-1 text-xs"
                      />
                    </div>
                  </div>
                </div>

                {shipForm.guns.length > 0 && (
                  <div className="p-2 bg-slate-900/50 rounded border border-slate-600">
                    <div className="text-xs text-slate-400 mb-1">📊 Stats:</div>
                    {(() => {
                      const stats = calculateDerivedStats(shipForm);
                      return (
                        <div className="grid grid-cols-3 gap-1 text-xs">
                          <div><span className="text-slate-400">HVN:</span> <span className="text-green-400">{stats.hvn}</span></div>
                          <div><span className="text-slate-400">SVN:</span> <span className="text-green-400">{stats.svn}</span></div>
                          <div><span className="text-slate-400">GDN:</span> <span className="text-green-400">{stats.gdn}</span></div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>

              <button onClick={createShip} className="mt-2 w-full px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded font-bold text-xs">
                ⚓ Create Ship
              </button>
              {shipAddedMessage && (
                <div className="mt-1 text-center text-green-400 font-bold text-xs">{shipAddedMessage}</div>
              )}
            </div>

            <div className="space-y-2">
              {ships.map(ship => (
                <div key={ship.id} className="bg-slate-800 rounded-lg p-2 border border-slate-700">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-sm">{ship.name}</h3>
                    <div className="flex gap-2 items-center">
                      {ship.sp === 0 && (
                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-white text-black animate-pulse">
                          ⚑ STRUCK!
                        </span>
                      )}
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                        ship.sp >= 7 ? 'bg-green-700' : ship.sp >= 4 ? 'bg-yellow-700' : 'bg-red-700'
                      }`}>
                        SP {ship.sp}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                    <div>
                      <span className="text-slate-400">Hull:</span> {Math.floor((ship.hullDamage / ship.hvn) * 100)}%
                    </div>
                    <div>
                      <span className="text-slate-400">Sails:</span> {ship.sailsLost.length}/{ship.sails}
                    </div>
                    <div>
                      <span className="text-slate-400">Crew:</span> {ship.crew - ship.crewLoss}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    {['Port', 'Starboard', 'Bow', 'Stern'].map(arc => {
                      const guns = ship.arcs[arc];
                      if (!guns || guns.length === 0) return null;
                      return (
                        <div key={arc} className="p-1 bg-slate-900/50 rounded">
                          <div className="text-slate-400 font-bold">{arc}:</div>
                          {guns.map((g, i) => g.count > 0 && (
                            <div key={i}>{g.count}× {g.type}</div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                  {ship.fires.length > 0 && (
                    <div className="mt-1 text-xs text-orange-400">
                      🔥 {ship.fires.length} fire{ship.fires.length > 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

{activeTab === 'movement' && (
          <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold">Movement</h2>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={usePercentTurnPenalty}
                  onChange={(e) => setUsePercentTurnPenalty(e.target.checked)}
                  className="w-4 h-4"
                />
                <label className="text-xs">5% per turn</label>
              </div>
            </div>
            
            {ships.length === 0 ? (
              <div className="text-slate-400 text-center py-8 text-sm">
                No ships
              </div>
            ) : (
              ships.map(ship => {
                const movement = testMovement(ship);
                if (!movement) return null;

                const turnCap = getTurnCap(ship.class);

                return (
                  <div key={ship.id} className="bg-slate-700 rounded p-3 mb-3 border border-slate-600">
                    <h3 className="font-bold mb-2 text-sm">{ship.name}</h3>
                    
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Sail Point</label>
                        <select
                          value={ship.pos}
                          onChange={(e) => {
                            setShips(ships.map(s => 
                              s.id === ship.id ? { ...s, pos: e.target.value } : s
                            ));
                          }}
                          className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs"
                        >
                          <option value="QR">QR</option>
                          <option value="Ru">Ru</option>
                          <option value="RN">RN</option>
                          <option value="B">B</option>
                          <option value="D">D</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Turn Pts (max {turnCap})</label>
                        <input
                          type="number"
                          value={ship.turnPoints}
                          min="0"
                          max={turnCap}
                          onChange={(e) => {
                            const val = Math.min(turnCap, Math.max(0, parseInt(e.target.value) || 0));
                            setShips(ships.map(s => 
                              s.id === ship.id ? { ...s, turnPoints: val } : s
                            ));
                          }}
                          className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Last Move</label>
                        <input
                          type="number"
                          value={ship.lastMove}
                          min="0"
                          onChange={(e) => {
                            const val = Math.max(0, parseInt(e.target.value) || 0);
                            setShips(ships.map(s => 
                              s.id === ship.id ? { ...s, lastMove: val } : s
                            ));
                          }}
                          className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs"
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 rounded border border-cyan-600">
                      <div className="text-slate-400 text-xs mb-1">Allowed:</div>
                      <div className="font-mono text-xl text-cyan-400 font-bold">{movement.allowedRange}</div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {activeTab === 'gunnery' && (
          <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
            <h2 className="text-sm font-bold mb-2">Gunnery</h2>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Firing Ship</label>
                  <select
                    value={gunneryForm.firingShipId}
                    onChange={(e) => setGunneryForm(prev => ({ ...prev, firingShipId: e.target.value }))}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs"
                  >
                    <option value="">Select...</option>
                    {ships.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Target Ship</label>
                  <select
                    value={gunneryForm.targetShipId}
                    onChange={(e) => setGunneryForm(prev => ({ ...prev, targetShipId: e.target.value }))}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs"
                  >
                    <option value="">Select...</option>
                    {ships.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Fire Arc</label>
                  <select
                    value={gunneryForm.arc}
                    onChange={(e) => setGunneryForm(prev => ({ ...prev, arc: e.target.value }))}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs"
                  >
                    <option>Port</option>
                    <option>Starboard</option>
                    <option>Bow</option>
                    <option>Stern</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Target Loc</label>
                  <select
                    value={gunneryForm.targetLocation}
                    onChange={(e) => setGunneryForm(prev => ({ ...prev, targetLocation: e.target.value }))}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs"
                  >
                    <option>Port</option>
                    <option>Starboard</option>
                    <option>Bow</option>
                    <option>Stern</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Distance</label>
                  <input
                    type="number"
                    value={gunneryForm.distance}
                    onChange={(e) => setGunneryForm(prev => ({ ...prev, distance: parseFloat(e.target.value) }))}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Shot</label>
                  <select
                    value={gunneryForm.shotType}
                    onChange={(e) => setGunneryForm(prev => ({ ...prev, shotType: e.target.value }))}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs"
                  >
                    <option>Ball</option>
                    <option>Double</option>
                    <option>Dismantling</option>
                    <option>Grape</option>
                    <option>Canister</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Aim</label>
                  <select
                    value={gunneryForm.aimType}
                    onChange={(e) => setGunneryForm(prev => ({ ...prev, aimType: e.target.value }))}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs"
                  >
                    <option>Hull</option>
                    <option>Rigging</option>
                    <option>Crew</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Rake</label>
                  <select
                    value={gunneryForm.rakeType}
                    onChange={(e) => setGunneryForm(prev => ({ ...prev, rakeType: e.target.value }))}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs"
                  >
                    <option>None</option>
                    <option>Bow</option>
                    <option>Stern</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={gunneryForm.useInitialBroadside}
                  onChange={(e) => setGunneryForm(prev => ({ ...prev, useInitialBroadside: e.target.checked }))}
                />
                <label className="text-xs">Initial Broadside (+50)</label>
              </div>

              <button onClick={executeGunnery} className="w-full px-3 py-2 bg-red-600 hover:bg-red-700 rounded font-bold text-sm">
                🔥 FIRE!
              </button>

              {lastGunneryResult && (
                <div className="mt-2 p-2 bg-green-900/20 border-2 border-green-600 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-green-300 font-bold text-sm">✓ HIT!</div>
                    <button onClick={() => setLastGunneryResult(null)} className="px-2 py-0.5 bg-slate-700 rounded text-xs">
                      Clear
                    </button>
                  </div>
                  <div className="text-xs">
                    <div className="mb-1">
                      <strong>{lastGunneryResult.firingShip}</strong> ({lastGunneryResult.arc}) → 
                      <strong> {lastGunneryResult.targetShip}</strong> ({lastGunneryResult.targetLocation})
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-2 p-2 bg-slate-900/50 rounded">
                      <div className="text-center">
                        <div className="text-xs text-slate-400">Hits</div>
                        <div className="text-lg font-bold text-cyan-400">{lastGunneryResult.totalHits}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-slate-400">Damage</div>
                        <div className="text-lg font-bold text-red-400">{lastGunneryResult.totalDamage}</div>
                      </div>
                    </div>
                    {lastGunneryResult.aimType === 'Crew' && (
                      <div className="mb-2 p-2 bg-red-900/30 border border-red-700 rounded text-center text-xs">
                        💀 {lastGunneryResult.crewLost} casualties
                      </div>
                    )}
                    <button
                      onClick={applyDamage}
                      className="w-full px-2 py-1 bg-orange-600 hover:bg-orange-700 rounded font-bold text-xs"
                    >
                      ⚡ APPLY DAMAGE
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'damage' && (
          <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
            <h2 className="text-sm font-bold mb-2">Damage</h2>
            {ships.length === 0 ? (
              <div className="text-slate-400 text-center py-8 text-xs">No ships</div>
            ) : (
              <div className="space-y-2">
                {ships.map(ship => {
                  const hullPct = Math.floor((ship.hullDamage / ship.hvn) * 100);
                  const sailPct = Math.floor((ship.sailsLost.length / ship.sails) * 100);
                  
                  return (
                    <div key={ship.id} className="bg-slate-700 rounded p-2 border border-slate-600">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-xs">{ship.name}</h3>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          ship.sp >= 7 ? 'bg-green-700' :
                          ship.sp >= 4 ? 'bg-yellow-700' :
                          'bg-red-700'
                        }`}>
                          SP {ship.sp}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 mb-2">
                        <div className="p-2 bg-slate-800 rounded text-center">
                          <div className="text-xs text-slate-400">Hull</div>
                          <div className={`text-base font-bold ${hullPct >= 80 ? 'text-red-400' : hullPct >= 50 ? 'text-yellow-400' : 'text-green-400'}`}>
                            {100 - hullPct}%
                          </div>
                        </div>
                        <div className="p-2 bg-slate-800 rounded text-center">
                          <div className="text-xs text-slate-400">Sails</div>
                          <div className={`text-base font-bold ${sailPct >= 70 ? 'text-red-400' : sailPct >= 40 ? 'text-yellow-400' : 'text-green-400'}`}>
                            {ship.sails - ship.sailsLost.length}
                          </div>
                        </div>
                        <div className="p-2 bg-slate-800 rounded text-center">
                          <div className="text-xs text-slate-400">Crew</div>
                          <div className="text-base font-bold text-slate-200">
                            {ship.crew - ship.crewLoss}
                          </div>
                        </div>
                      </div>

                      {ship.fires.length > 0 && (
                        <div className="p-2 bg-orange-900/30 border border-orange-700 rounded text-xs mb-2">
                          <div className="flex items-center gap-1 mb-1">
                            <Flame className="w-3 h-3 text-orange-400" />
                            <span className="font-bold text-orange-300">{ship.fires.length} Fire{ship.fires.length > 1 ? 's' : ''}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'log' && (
          <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
            <h2 className="text-sm font-bold mb-2">Battle Log</h2>
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {log.slice().reverse().map(entry => (
                <div key={entry.id} className={`text-xs p-2 rounded ${
                  entry.type === 'error' ? 'bg-red-900/20 text-red-300' :
                  entry.type === 'success' ? 'bg-green-900/20 text-green-300' :
                  'bg-slate-700 text-slate-300'
                }`}>
                  <span className="text-slate-500">[T{entry.turn}]</span> {entry.message}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}