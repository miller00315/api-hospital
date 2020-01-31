module.exports = {
  title: 'Laboratório',
  code: 'laboratory',
  values: {
    sepse_kit: [
      { id: 'yes', value: true, label: 'Sim' },
      { id: 'no', value: false, label: 'Não' },
    ],
    hemo_cult_before_atb: [
      { id: 0, value: 'n/a', label: 'N/A'},
      { id: 1, value: true, label: 'Sim' },
      { id: 2, value: false, label: 'Não'}
    ],
    collect_type: [
      { 
        id: 0,
        values:  [
        { id: 1, value: true, title: 'Sim' },
        { id: 2, value: false, title: 'Não' },
        ], 
        title: 'Urina' 
      },
      { 
        id: 1,
        values:  [
          { id: 1, value: true, title: 'Sim' },
          { id: 2, value: false, title: 'Não' },
        ], 
        title: 'Sangue' 
      },
      { 
        id: 2,
        values:  [
          { id: 1, value: true, title: 'Sim' },
          { id: 2, value: false, title: 'Não' },
        ], 
        title: 'Cateter' 
      },
      { 
        id: 3,
        values:  [
          { id: 1, value: true, title: 'Sim' },
          { id: 2, value: false, title: 'Não' },
        ], 
        title: 'Escarro' 
      },
      { 
        id: 4,
        values:  [
          { id: 1, value: true, title: 'Sim' },
          { id: 2, value: false, title: 'Não' },
        ], 
        title: 'Swap pele/mucosa' 
      },
      { 
        id: 5,
        values:  [
          { id: 1, value: true, title: 'Sim' },
          { id: 2, value: false, title: 'Não' },
        ], 
        title: 'Líquor' 
      },
    ],
  }
}