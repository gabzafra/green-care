class GeoService {
    calcDistance = (lat1, lng1, lat2, lng2) => {
        const R = 6371; // earth radius in km
        let dLat = this.toRad(lat2 - lat1);
        let dLng = this.toRad(lng2 - lng1);
        lat1 = this.toRad(lat1);
        lat2 = this.toRad(lat2);
      
        let a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;
        return d;
      }
      
    toRad = (value) => {
        return (value * Math.PI) / 180;
      }
      
    getUserLocationArr = (locations, radius = 0.02) => {
        let resultArr = [];
        if (locations.length > 0) {
          let currentLoc = locations.pop();
          resultArr.push(currentLoc);
          while (locations.length > 0) {
            let nextLoc = locations.pop();
            if (
              this.calcDistance(currentLoc[0], currentLoc[1], nextLoc[0], nextLoc[1]) >
              radius
            ) {
              resultArr.push(nextLoc);
              currentLoc = nextLoc;
            }
          }
        }
        return resultArr;
      }
}

export default GeoService;