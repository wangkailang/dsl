import * as ohm from 'ohm-js';

export const myGrammar = ohm.grammar(String.raw`
  Arithemetic {
    Exp = Exp "+" number -- plus
        | Exp "-" number -- minus
        | Exp "*" number -- times
        | Exp "/" number -- divide
        | number
    number = digit+
  }
`);