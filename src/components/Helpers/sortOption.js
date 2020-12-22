module.exports = [
  {
    value: {sort: {created_at: 'DESC'}},
    label: 'Terbaru',
  },
  {
    value: {sort: {created_at: 'ASC'}},
    label: 'Terlama',
  },
  {
    value: {sort: {name: 'ASC'}},
    label: 'Nama dari A - Z',
  },
  {
    value: {sort: {name: 'DESC'}},
    label: 'Nama dari Z - A',
  },
  {
    value: {sort: {price: 'ASC'}},
    label: 'Harga (termurah)',
  },
  {
    value: {sort: {price: 'DESC'}},
    label: 'Harga (termahal)',
  },
];
