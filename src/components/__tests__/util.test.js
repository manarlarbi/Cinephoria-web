import { isValidEmail,isValidPassword } from "../../utils/validation";
test ("isValideEmail doit returner true pour un email valider",()=>{
    expect (isValidEmail("test@email.com")).toBe(true);
});

test("isValidPassword doit returner true pour un mot de passe valider",()=>{
    expect(isValidPassword("Test@1234")).toBe(true);
});
test("isValidEmail doit retourner false pour un email invalide", () => {
    expect(isValidEmail("testemail.com")).toBe(false);
  });
  test("isValidPassword doit retourner false pour un mot de passe faible", () => {
    expect(isValidPassword("abc")).toBe(false);
  });