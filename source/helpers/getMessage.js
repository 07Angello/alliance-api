// LEVEL 1
const getMessage = (messages) => {
    const limit = messages.length - 1
    let mergedArray = [];


        let arrayOfSentences = messages[0].concat(messages[1]).filter((w) => w !== '');
        const arrayOfwords = messages[2];

        let sentence = arrayOfwords.join(' ');

        arrayOfSentences.forEach(s => {
          sentence = sentence.replace(s, s.replace(/\s/g, '|'));
        });

        mergedArray = sentence.split(' ').map(s => s.replace(/\|/g, ' '));


    let message = mergedArray.slice(0, mergedArray.length - 1).join(' ') + mergedArray.slice(-1);

    return message;
}

module.exports = {
    getMessage
}
