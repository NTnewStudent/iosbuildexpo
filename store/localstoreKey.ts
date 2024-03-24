type UserStore =  {
    mnemonic:string,
    keystore:string,
    publiceKey:string,
    regCurIdCard:string
}

enum UserStoreKey {
    MEMO="mnemonic",
    KEY_STORE="keystore",
    PUBLIC_KEY="publiceKey",
    REG_CUR_USER_IDCARD="regCurIdCard"
}

export {
    UserStoreKey
}
export default UserStore