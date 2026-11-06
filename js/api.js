const baseURL = "https://digimon-api.vercel.app/api/digimon";

//One function for every route
//getDigimon => all digimon
//getDigimon("/name/agumon") => one Digimon
//getDigimon("/level/rookie") => every digimon at that level
export const getDigimon = async (route = "") => {
    const res = await fetch(baseURL + route);
    const data = await res.json();
    
    return data;
}
