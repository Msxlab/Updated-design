export const patterns = {
    marble: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E")`,
    granite: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.7' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.2'/%3E%3C/svg%3E")`,
    quartzite: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.15' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.25'/%3E%3C/svg%3E")`,
    solid: 'none'
  };
  
  export const colors = [
    '#e0e0e0', '#c5c5c5', '#a3a3a3', '#d2b48c', '#deb887',
    '#8B4513', '#D2691E', '#000000', '#F5F5DC', '#DCDCDC',
    '#696969', '#B8860B', '#CD853F', '#DAA520', '#BC8F8F'
  ];
  
  export const GRID_SIZE = 10;
  
  export const snapToGrid = (value) => Math.round(value / GRID_SIZE) * GRID_SIZE;