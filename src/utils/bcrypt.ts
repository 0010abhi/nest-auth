import * as bcrypt from 'bcrypt';

export async function createHashedString(str: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(str, salt);
    return hash;
}

export async function compareHashedString(str: string, hashedString: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(str, hashedString);
    return isMatch;
}

