var Role;
(function (Role) {
    Role[Role["police"] = 0] = "police";
    Role[Role["army"] = 1] = "army";
    Role[Role["soldir"] = 2] = "soldir";
    Role[Role["nurse"] = 3] = "nurse";
})(Role || (Role = {}));
console.log(Role.police);
