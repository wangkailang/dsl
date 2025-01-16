grammar formula ;

@header {
/* eslint-disable */
}

prog: expr+ ;

expr: FUNCNAME '(' args? ')'         # funcCall
    | expr op=('*'|'/') expr         # MulDiv
    | expr op=('+'|'-') expr         # AddSub
    | NUM                            # number
    | FIELD                          # field
    | '(' expr ')'                   # parents
    ;

args: expr (',' expr)* ;


NUM : ('-')?[0-9]+('.' [0-9]+)? ;
FIELD: '#'.*?'$' ;
FUNCNAME: [a-zA-Z]+ ;
WS  : [ \t]+ -> skip ;


MUL : '*' ;
DIV : '/' ;
ADD : '+' ;
SUB : '-' ;
