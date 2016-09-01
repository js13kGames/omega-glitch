// level 1 content

// 1: north
// 2: north_east
// 3: east
// 4: south_east
// 5: south
// 6: south_west
// 7: west
// 8: north_west

var CONTENT = CONTENT || {levels:{}};

CONTENT.levels['5'] = {
  charges: 1,
  spots: {
    s1: {
      x: 8,
      y: 20,
      n: ['s2',0]
    },
    s2: {
      x: 9,
      y: 13,
      s: ['s1',0],
      n: ['s3',1],
      e: ['s4',2]
    },
    s3: {
      x: 6,
      y: 12,
      n: ['s2',1],
      charge: true
    },
    s4: {
      x: 16,
      y: 15,
      w: ['s2',2],
      s: ['s5',3],
      e: ['s7',6]
    },
    s5: {
      x: 15,
      y: 20,
      n: ['s4',3],
      s: ['s6',4]
    },
    s6: {
      x: 22,
      y: 20,
      w: ['s5',4],
      n: ['s7',5]
    },
    s7: {
      x: 19,
      y: 15,
      w: ['s4',6],
      s: ['s6',5],
      e: ['s8',7]
    },
    s8: {
      x: 23,
      y: 10,
      s: ['s7',7],
      w: ['s9',8]
    },
    s9: {
      x: 19,
      y: 11,
      e: ['s8',8]
    }

  },
  paths: [
    ['s1',1,3,2,1,1,3],
    ['s2',1,2,2,1,1,3,8,1,7,3,6,1,5,2,4,1,5,2],
    ['s2',3,2,4,2,3,3],
    ['s4',5,2,6,1,5,2],
    ['s5',5,1,6,9,3,1,2,10,3,1,6,10,3,1,2,10,3,1,6,10,3,1,2,10,3,1],
    ['s6',1,1,8,3,1,1],
    ['s4',3,3],
    ['s7',3,2,2,2,1,3],
    ['s8',7,2,6,1,7,1]
  ],
  start: 's1',
  objectives: ['s8'],
  patrols: [
    ['s5','s4','s7','s6']
  ],
  patrol_generators: [
    {
      s: 's5',
      p: [0]
    }
  ],
  gates: [
    {
      x: 18,
      y: 15,
      p: 6
    }
  ],
  gate_generators: [
    {
      s: 's9',
      g: [0],
      gp: [
        [5,6]
      ]
    }
  ]
};