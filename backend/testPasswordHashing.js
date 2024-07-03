const bcrypt = require('bcrypt');

async function testPasswordHashing() {
    const password = 'fatih';
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Plain password:', password);
    console.log('Hashed password:', hashedPassword);

    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log('Password match:', isMatch);
}

testPasswordHashing();
