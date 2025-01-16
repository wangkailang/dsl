grammar formula;

@header {
    package antlr;
}

prog: expr+ ;

expr: FUNCNAME '(' args? ')'      # Function
    | expr op=('*'|'/') expr      # MulDiv
    | expr op=('+'|'-') expr      # AddSub
    | NUMBER # Number
    | CELL # Cell
    | STRING # String
    | BOOLEAN # Boolean
    | ERROR # Error
    ;

args: expr (',' expr)* ;

FUNCNAME: [a-zA-Z]+ ;
NUMBER: [0-9]+ ('.' [0-9]+)? ;
CELL: '$'? [a-zA-Z]+ '$'? [0-9]+ ;
STRING: '"' .*? '"' ;
BOOLEAN: 'TRUE' | 'FALSE' ;
ERROR: '#' [a-zA-Z]+ ;


