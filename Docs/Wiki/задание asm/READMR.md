Компилятор ассемблера<br>
***
<br>
Для того, чтобы написать нормальный процессор, для начала нам нужен сборщик бинарного кода для него, иными словами - компилятор ассемблера. <br>
<br>
Стандартный ассемблерный код, выглядит примерно так :<br>
<br>
```assembler
start: ;начало работы, выходная точка
 MOV AX,65 ;Присваиваем регистру AX значение 65
 CALL program ;Безусловным вызываем вызываем подпрограмму "program" (текущий адрес копируется в стек)
 CP AX, 90; Сравниваем AX и 90, сравнение выставляет флаг F0 в 1(true). так как 90 = 90
 
program: ;точка вызова подпрограммы
 ADD AX,25; Прибавляем 25 к AX
 RET; Возвращаемся обратно в основную программу 
```
<br>
Нащ, я модифицировал до такого вида:<br>
<br>
```assembler
PROGRAM START
BEGIN
 byte tst2 5;
 GLOBAL byte tst = 55; //так, можно объявить переменную
 SET tst2 = tst + 55 / 2;
 MOV AX, 65; //Присваиваем регистру AX значение 65
 CALL program; //Безусловным вызовом вызываем подпрограмму "program" (текущий адрес копируется в стек)
 CP AX, 90; //Сравниваем AX и 90, сравнение выставляет флаг F0 в 1(true). так как 90 = 90
END
```
<br>
Появились более менее привычные функции, переменные и весь код в целом выглядит более читабельно.<br>
<br>
Расширение нашего ассемблерного кода : *.sasm (shtorm assembler)<br>
<br>
Существует два типа сборки, это сборка ЯДРА операционной системы, и сборщик пользовательских программ использующий заголовочный файл ядра. (сборщик программ пока не делаем, это задел на будущее)<br>
<br>

***

<h2>Сборка кода</h2><br>

Исходный код, поступает в компилятор в виде текстового файла с расширением *.sasm , допустима сборка многофайловых проектов, но для этого в основном файле программы нужно через команду #include "путь к библиотеке"; указать каждый из дополнительных файлов программы.<br>
<br>
<h3>Сборка ядра</h3>
<br>
При сборке ядра, основным файлом является "core.sasm" , в котором лежат все #include строки. Точкой входа, является функция START. <br>
<br>
В начале работы, компилятор объединяет все файлы в единый большой текстовый файл (String). <br>
Затем, идёт поиск всех функций и создание их объектов, включающих в себя <br>
<br>
```java
		public String name = ""; //Имя
		public String src = ""; //Исходный код
		public ArrayList<Byte> bin = new ArrayList<Byte>(); //собранный бинарный код
		public int id = -1; //порядковый номер
		public int calladr = -1; //точка вызова из листа
```
<br>
Каждой функции присваивается своё имя из заголовка кода, в неё копируется ей код, бзе BEGIN и END и присваивается уникальный порядковый номер.<br>
<br>
Далее происходит сборка каждой функции.<br>
<br>
Затем происходит сборка бинарного файла <br>
<br>
в первых трех байтах лежит команда JMP до точки вызова START<br>
Далее лежит блок с адресацией всех функций системы, в начале лишь подсчитывается его размер и делается отступ
<br><br>
После блока адресации идёт помещение всех функций операционной системы, при том заносятся адреса точки их старта в адресационный блок.<br>
<br>
После всех функций лежит команда JMP 0 , которая позволит процессору перезагрузиться в случае если он по какой то причине улетит из за пределы программного кода
также JMP 0 должен лежать и в основной функции START
<br>
После JMP0 идёт область данных<br>
<br>
В результате сборки получается бинарный образ пзу калькулятора (core.bin), и небольшой файлик с заголовками функций, нужный для сборки пользовательских программ (core.shead)<br>
<br>
<h3>Сборка пользовательских программ</h3>
<br>
Для сборки пользовательских программ, нужно указать заголовочный core.shead файл ядра<br>
<br>
Точкой старта является MAIN в конце неё должна быть RET или CALL MAIN для зацикливания <br>
В пользовательские программы можно также включать дополнительные файлы, а также вызывать функции из ядра (для этого и нужен заголовочный файл, но при этом нет проверки на корректность функции ядра) в целом сборка аналогична, за исключением того, что нужно указывать имя программы в особой глобальной переменной PRO_NAME  а функция MAIТ превратится в PRO_NAME, при сборке заголовка<br>

<br>
Компиляция предтавляет собой превращение строк в байт код<br>
<br>
код:
```assembler
MOV AL, 55; // Заносим 55 в AL
ADD CL,AL;  // Прибавляем AL к CL
CP CL,AL -> // Сравниваем CL и AL
```
<br>
Компиляция:<br>
MOV AL, 55; -> 01,01,55<br>
ADD CL,AL; -> 2,44<br>
CP CL,AL -> 8,44	<br>
<br>
И в бинарном файле это будет выглядеть вот так : 01,01,55,2,44,8,44<br>

<br>
Рассмотрим кое что по сложнее<br>
<br>
есть два файла с кодом:<br>

***
Файл boot.sasm 

```assembler 
#include "testlib.sasm";

PROGRAM START
BEGIN
 byte tst2 5;
 GLOBAL byte tst = 55; //так, можно объявить переменную
 SET tst2 = tst + 55 / 2;
 MOV AX, 65; //Присваиваем регистру AX значение 65
 CALL program; //Безусловным вызовом вызываем подпрограмму "program" (текущий адрес копируется в стек)
 CP AX, 90; //Сравниваем AX и 90, сравнение выставляет флаг F0 в 1(true). так как 90 = 90
END
```
<br><br>
***
Файл testlib.sasm

```assembler 
PROGRAM program
BEGIN
 ADD AX,25; //Прибавляем 25 к AX
 RET; //Возвращаемся обратно в основную программу 
END

```
<br>
Основным файлом, как уже говорилось ранее, является boot.sasm, в нём лежит #include "testlib.sasm",
поэтому происходит объединение в 1 большой файл <br>
<br>
Далее идёт сканирование функций <br>
функция 0 = START<br>
функция 1 = program<br>
<br>
Далее идёт непосредственная сборка кода <br>
<br>
сначала START <br>
 byte tst2 5; -> СОздание переменной типа byte с именем tst2 и значением 5 (переменные хранятся в памяти компилятора и подставляются в бинарник) <br>
 GLOBAL byte tst = 55; -> создаёт глобальную переменную, которую видят все функции<br>
 SET tst2 = tst + 55 / 2; -> идёт подсчёт уравнения слева и занесение его в переменную справа<br>
 MOV AX, 65; -> присвоение регистру AX числа 65, так как AX - 16 битный , то 65 это число short и имеет вид 00,65 -> код: 1,9,0,65<br>
 CALL program -> вызов функции program, смотрим в списке функций, какой id у данной, находим что 1, список с адресами функций лежит по адресу 4:id функции * 2, в нашем случае адрес вызова будет 4+1*2 (6)
 -> команда превращается в CALL [5] -> код : 11,12,0,5<br>
 <br>
 Произошёл прыжок в функцию program<br>
 <br>
 ADD AX,25;->прибавить 25 к AX -> код: 2,9,0,25<br>
 RET -> код: 13,0<br>
 <br>
 произошёл прыжок обратно в START<br>
 <br>
 CP AX, 90; -> код 8,9,0,90<br>
 <br>
Все функции собраны, теперь идёт сборка бинарного образа диска<br>
<br>
в начале, идёт подсчёт функций и выделение место под начальный JMP + область адресации (количество функций*2+3) = 2*2+4 = 8<br>
<br>
пишем в начало файла JMP 8+1 ->9,12,0,9<br>
Затем считаем сколько места занимает каждая функция (START=12,program=6)<br>
<br>
пишем адрес START в адрес 0 адресации (4,5 байт) ->[9,12,0,9,] + 0,9<br>
пишем адрес START в адрес 1 адресации (6,7 байт) ->[9,12,0,9,0,9] + 9+12(0,23)<br>
<br>
далее записываем две функции последовательно<br>
<br>
И всё, программа готова 
<br>
 
 
 







