/* import ruquest from "@/common/request.js";
export const login = (data) => {
  return ruquest.post("/api/v1.0/login", data);
};
 */

export const login = () => {
  return new Promise((resolve) => {
    resolve({
      name: "admin",
      token: "ccASDwewdhjaslkdhsajhj821aAWUI"
    });
  });
};
