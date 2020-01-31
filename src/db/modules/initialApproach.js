module.exports = {
  code: 'initialApproach',
  title: 'Abordagem inicial',
  values: {
    volume: [
      {title: 'Sim', value: true},
      {title: 'Não', value: false}
    ],
    vasoActiveDrugs: [
      {title: 'Sim', value: true},
      {title: 'Não', value: false},
    ],
    vasoActiveDrugsName: [
      { id: 0, value: 'N/A', label: 'N/A' },
      { id: 1, value: 'noradrenalina', label: 'Noradrenalina' },
      { id: 2, value: 'dobutamina', label: 'Dobutamina' },
      { id: 3, value: 'ancoron', label: 'Ancoron' },
      { id: 4, value: 'nora-dobuta', label: 'Nora/Dobuta' },
      { id: 5, value: 'nora-dobuta-ancoron', label: 'Nora/Dobuta/Ancoron' },
    ],
    hemoTransfusion: [
      { id: 'yes', value: true, label: 'Sim' },
      { id: 'no', value: false, label: 'Não' },
    ],
    mecanicalVentilation: [
      { id: 'yes', value: true, label: 'Sim' },
      { id: 'no', value: false, label: 'Não' },
    ],
  },
};