import jwt from "jsonwebtoken";
const SECRET_KEY = "manar_clef";
describe("Token jwt simple",()=>{
    it ("doit contenir l'id_utilisateur et le role",()=>{
        const token_composition={
            id_utilisateur:1,
            role:"utilisateur"
        };
        const token = jwt.sign(token_composition,SECRET_KEY);
        const decoded= jwt.decode(token,SECRET_KEY);
        expect (decoded.id_utilisateur).toBe(1);
        expect (decoded.role).toBe("utilisateur");

});
});