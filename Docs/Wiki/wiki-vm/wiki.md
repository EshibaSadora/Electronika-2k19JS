Команды псевдо_ос

CONSOLE_OS

Базовые:
RINT - вывести строку на экран | PRINT "Hello World";
PRINTLN- вывести строку на экран, перенос строки  | PRINTLN "Hello World";
READLN - считать строку | STRING Var1; READLN Var1;  Останавливает систему до воввода строки (нажатия кнопки Enter)
READKEY - считать код кнопки(символ) | Byte a; READKEY a; Останавливает систему до нажатия клавиши
CLS - Очистка жкрана | CLS

CD - переход по папкам | CD ..; CD TEST;
DIR - Вывести список файлов и папкок | DIR


Компилятор 
BUILD - Постороить текстовый файл из исходников | BUILD TEST.SASM -> Собирается в TEST.sbin
Имеет специальные переменные вовода-вывода для связи с калькулятором VMIN,VMOUT (Char[80])
Может запускать функции PRINT,PRINTLN,READKEY,CLS,READLN
RUN - Запустить sbin скрипт | RUN TEST.SBIN
