package eshiba.sasm;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap.KeySetView;

import eshiba.Ini;

public class Main {

	public static void main(String[] args) throws IOException {
		
		class Variable {
			String name = "";
			String type = "";
			String value = "";	
			int adr = 0;
		}
		
		HashMap<String, String> DECLARE = new HashMap<String, String>();
		HashMap<String, Variable> VARIABLES = new HashMap<String, Variable>();		
		ArrayList<String> DATA = new ArrayList<String>();
	
		eshiba.Ini ini = new Ini("params.ini");	
		String src_path_files = ini.Read("sasm", "src");
		String path = ini.Read("sasm", "path");
		String [] src_path = src_path_files.split(";");	
		
		String OUT = "";
		
		String src = "";
		
		
		//Ищем DECLARE
		for(String p : src_path) {
			src = eshiba.Txt.ReadFile(path + p);
			
			String [] srcs = src.split("\n");			
					
			for(String s : srcs) {
				s=s.replace(";", "");
				if(!s.contains("//")) {
					if(s.contains("DECLARE")) {
						s = s.replace("DECLARE ", "");
						DECLARE.put(eshiba.string.delfrom(s.split("=")[0], ' ') ,eshiba.string.delfrom(s.split("=")[1], ' '));					//OUT = OUT + s + ";\n";
					} else {
						OUT = OUT +  s + "\n" ;
					}
				} else {
					if(s.split("//")[0].length()>1) {
						OUT = OUT +  s.split("//")[0] + "\n" ;
					}
				}
			}		
		}
		
		
		
		
		//Подставляем DECLARE
		String [] InLines = OUT.split("\n");
		ArrayList<String> OutLines = new ArrayList<String>();
		for(String inline : InLines) {
				boolean find = false;
				for(String DEC : DECLARE.keySet()) {
					if(inline.contains(DEC)) {
						OutLines.add(inline.replace(DEC, DECLARE.get(DEC)));
						find = true;
					}
				}
					if(!find)
					OutLines.add(inline);
		}
		
		
		OUT = "";
		
		for(String outline : OutLines) {
			OUT = OUT + outline + "\n";
		}

		
		
		//Ищем DATA
		InLines = OUT.split("\n");
		OutLines = new ArrayList<String>();
		for(String inline : InLines) {
			if(inline.contains("DATA")) {
				DATA.add(inline);
			}else {
				OutLines.add(inline);
			}
		}
		
		OUT = "";
		
		for(String outline : OutLines) {
			OUT = OUT + outline + "\n";
		}

		
		
		//Декларирование переменных
		/*
		 * Переменные бывают только глобальные и не удаляются, тип string фиксированного размера
		 * и равен 32 байта, Int = 1байт, Int16 = 2байта, text=256байт
		 * В String и Text, первым байтом пишется их реальный размер
		 */
		int MEMADR = 0;

		InLines = OUT.split("\n");
		OutLines = new ArrayList<String>();
		for(String inline : InLines) {
			boolean find = false;
			if(inline.contains("Int")) {
				find = true;
				Variable var = new Variable();
				var.type = "Int";
				var.name = eshiba.string.delfrom(inline.split("=")[0].replace("Int ", "")," ");
				var.value = eshiba.string.delfrom(inline.split("=")[1]," ");	
				var.adr = MEMADR;
				VARIABLES.put(var.name,var);
				MEMADR++;
			}
			if(inline.contains("Int16")) {
				find = true;
				Variable var = new Variable();
				var.type = "Int16";
				var.name = eshiba.string.delfrom(inline.split("=")[0].replace("Int16", "")," ");
				var.value = eshiba.string.delfrom(inline.split("=")[1]," ");	
				var.adr = MEMADR;
				VARIABLES.put(var.name,var);
				MEMADR = MEMADR + 2;
			}
			
			if(inline.contains("String")) {
				find = true;
				Variable var = new Variable();
				var.type = "String";
				var.name = eshiba.string.delfrom(inline.split("=")[0].replace("String", "")," ");
				var.value = inline.split("\"")[1];
				var.adr = MEMADR;
				VARIABLES.put(var.name,var);
				MEMADR = MEMADR + 32;
			}
			
			if(inline.contains("Text")) {
				find = true;
				Variable var = new Variable();
				var.type = "Text";
				var.name = eshiba.string.delfrom(inline.split("=")[0].replace("Text", "")," ");
				var.value =  eshiba.string.split(eshiba.string.delfrom(inline.split("=")[1]," "),'"')[1];	
				var.adr = MEMADR;
				VARIABLES.put(var.name,var);
				MEMADR = MEMADR + 256;
			}
			if(!find)OutLines.add(inline);
		}
		
		OUT = "";
		
		for(String outline : OutLines) {
			OUT = OUT + outline + "\n";
		}
		
		
		//Получение адреса переменной
		
		InLines = OUT.split("\n");
		OutLines = new ArrayList<String>();
		
		for(String inline : InLines) {
			
			if(inline.contains("ADR")) {
				String [] other = inline.split(" ");
				for(String s : other) {
					String saves = s;
					if(s.contains("ADR")){
						s = s.replace(".ADR", "");
						s = eshiba.string.delfrom(s, ",");
						s = eshiba.string.delfrom(s, "$");
						s = eshiba.string.delfrom(s, " ");
						
						Variable var = VARIABLES.get(s);
						
						if(var!=null) {
							OutLines.add(inline.replace(saves, String.valueOf(var.adr)));
						}else {
							//TODO ERROR - переменная не найдена
						}
						
					}
				}
				
				
				//inline = eshiba.string.delfrom(inline, ",");
				//inline = eshiba.string.delfrom(inline, "$");
				//inline = eshiba.string.delfrom(inline, " ");
			}else {
				OutLines.add(inline);
			}
		}
		
		OUT = "";	
		for(String outline : OutLines) {
			OUT = OUT + outline + "\n";
		}
		
		
		//Поиск псевдофукций прекомпилятора
		
		InLines = OUT.split("\n");
		OutLines = new ArrayList<String>();
		
		for(String inline : InLines) {
			boolean find = false;
			
			if(inline.contains("#printf")) {
				String param = inline.split(" ")[1];
				if(param.contains("@")) {
					param = eshiba.string.delfrom(param, "@");
					param = eshiba.string.delfrom(param, " ");
				}
			}
			
			if(!find)OutLines.add(inline);
		}
		
		OUT = "";	
		for(String outline : OutLines) {
			OUT = OUT + outline + "\n";
		}
		
		//Поиск использования переменных в коде
		InLines = OUT.split("\n");
		OutLines = new ArrayList<String>();
		for(String inline : InLines) {
			if(inline.contains("$")) {
				String buffer0[] = inline.split(" ");
				for(int i = 0; i < buffer0.length;i++) {
					String s = buffer0[i];
					if(s.contains("$")) {
						s = eshiba.string.delfrom(s, ",");
						s = eshiba.string.delfrom(s, "$");
						s = eshiba.string.delfrom(s, " ");
						
						if(!s.contains("[")) {
						
						Variable var = VARIABLES.get(s);
						if(var!=null) {
							boolean find = false;
							if(var.type.equals("Int")) {
								if(i == 1) {
									OutLines.add("PUSH BX");								
									OutLines.add(inline.replace("$" + s, "AL"));
									OutLines.add("MOV BX, " + var.adr);
									OutLines.add("CALL RAM_WRITE");																
									OutLines.add("POP BX");
									find = true;
								}else {
									OutLines.add("PUSH BX");	;
									OutLines.add("MOV BX, " + var.adr);
									OutLines.add("CALL RAM_READ");
									OutLines.add(inline.replace("$" + s, "AL"));
									OutLines.add("POP BX");
									find = true;
								}
							} 
							
							if(var.type.equals("String") || var.type.equals("Text")) {
								if(s.contains("[")) {
									int id = Integer.valueOf(s.split("[")[1].split("]")[0]); 
									
									if(i == 1) {
										OutLines.add("PUSH BX");									
										OutLines.add(inline.replace("$" + s, "AL"));
										OutLines.add("MOV BX, " + (var.adr+id));			
										OutLines.add("CALL RAM_WRITE");																
										OutLines.add("POP BX");
										find = true;
									}else {
										OutLines.add("PUSH BX");	
										OutLines.add("MOV BX, " + (var.adr+id));
										OutLines.add("CALL RAM_READ");
										OutLines.add(inline.replace("$" + s, "AL"));					
										OutLines.add("POP BX");
										find = true;
									}
								}
							}
							
							if(!find) {
								OutLines.add(inline);
							}
						
						}else
						{
							//TODO ERROR - переменная не найдена
						}
					
					}else {
						//Если содержит []
						String index = eshiba.string.split(eshiba.string.split(s, "[")[1],"]")[0];
						String varname =  eshiba.string.split(s, "[")[0];
						
						
						
						Variable var = VARIABLES.get(varname);
						
						if(var != null) {
							OutLines.add("PUSH AX");
							
							try {
								OutLines.add("MOV BX, " + (var.adr + Integer.valueOf(index)));
							}catch (Exception e) {
								OutLines.add("MOV BX, 0");
								OutLines.add("ADD BX, " + var.adr);
								OutLines.add("ADD BX, " + index);
							}
							OutLines.add("CALL RAM_READ");
							OutLines.add(inline.split(",")[0] + ", AL"); //берём часть строки из исходной строки и записываем полученный из озу AL в него						
							OutLines.add("POP AX");
						}else
						{
							//TODO ERROR - переменная не найдена
						}
						

					}
						
					}
				}
				
			}else {
				OutLines.add(inline);
			}
		}
		
		OUT = "";
		
		for(String outline : OutLines) {
			OUT = OUT + outline + "\n";
		}
		
		
	
		//Финальная сборка
		String init = ":INIT\n";
		for(String s : VARIABLES.keySet()) {
			Variable var = VARIABLES.get(s);
			
			if(var.type.equals("Int")) {
					
			init = init + "MOV BX, " + var.adr + ";\n";
			init = init + "MOV AL, " + var.value+ ";\n";
			init = init + "CALL RAM_WRITE"+ ";\n";	
			}
			
			if(var.type.equals("String")) {
				
				init = init + "MOV BX, " + (var.adr)+ ";\n";
				//TODO init = init + "MOV AL, " + var.value.length() + ";\n";
				init = init + "MOV AL, " + (var.value.length()-1) + ";\n";
				init = init + "CALL RAM_WRITE"+ ";\n";
				
				char [] chars = new char[var.value.length()];
				var.value.getChars(0, chars.length, chars, 0);
				init = init + "RAM " + (var.adr + 1) + ", [";
				
				int i = 0;
				for(char c : chars) {
					init = init + String.valueOf(FontConverter(c)) + ",";
				}
				
				init = init + "];\n";
				
				init = init.replace(",]", "]");
				
				/*
				
				char [] chars = new char[var.value.length()];
				var.value.getChars(0, chars.length, chars, 0);
				
				int i = 0;
				for(char c : chars) {
					init = init + "MOV BX, " + (var.adr + i + 1)+ ";\n";
					init = init + "MOV AL, '" + c + "';\n";
					init = init + "CALL RAM_WRITE"+ ";\n";
					i++;
				}
				*/
			}
		}
		init = init + "CALL Main;\n";
		init = init +"\n";
		
		
		InLines = OUT.split("\n");
		OutLines = new ArrayList<String>();
		for(String inline : InLines) {
			if(inline.length() > 1 & !inline.contains(":")) {
				OutLines.add(inline + ";");
			}else {
				OutLines.add(inline);
			}
		}
		
		
		OUT = init;
	
		
		for(String outline : OutLines) {
			OUT = OUT + outline + "\n";
		}
		
		
		
		System.out.println(OUT);

	}
	
	String ReplaceVarriable(String IN) {
		String OUT = "";
		
		return OUT;
	}
	
	static ArrayList<String> GetArrayList(HashMap<String, String> MAP){
		ArrayList<String> OUT = new ArrayList<String>();
		Set<String> names = MAP.keySet();
		for(String name : names) {
			OUT.add(MAP.get(name));
		}
		return OUT;
	}
	
	static int FontConverter(char c) {
		return FontConverter1(c) + 1;
	}
	
	static int FontConverter1(char c) {
	    if (c == ' ') return -1;
	    if (c == '!') return 0;
	    if (c == '#') return 1;
	    if (c == '$') return 3;
	    if (c == '%') return 4;
	    if (c == '&') return 5;
	    if (c == '\'') return 6;
	    if (c == '(') return 7;
	    if (c == ')') return 8;
	    if (c == '*') return 9;
	    if (c == '+') return 10;
	    if (c == ',') return 11;
	    if (c == '-') return 12;
	    if (c == '.') return 13;
	    if (c == '/') return 14;
	    if (c == '0') return 15;
	    if (c == '1') return 16;
	    if (c == '2') return 17;
	    if (c == '3') return 18;
	    if (c == '4') return 19;
	    if (c == '5') return 20;
	    if (c == '6') return 21;
	    if (c == '7') return 22;
	    if (c == '8') return 23;
	    if (c == '9') return 24;
	    if (c == ':') return 25;
	    if (c == ';') return 26;
	    if (c == '<') return 27;
	    if (c == '=') return 28;
	    if (c == '>') return 29;
	    if (c == '?') return 30;
	    if (c == '@') return 31;
	    if (c == 'A') return 32;
	    if (c == 'B') return 33;
	    if (c == 'C') return 34;
	    if (c == 'D') return 35;
	    if (c == 'E') return 36;
	    if (c == 'F') return 37;
	    if (c == 'G') return 38;
	    if (c == 'H') return 39;
	    if (c == 'I') return 40;
	    if (c == 'J') return 41;
	    if (c == 'K') return 42;
	    if (c == 'L') return 43;
	    if (c == 'M') return 44;
	    if (c == 'N') return 45;
	    if (c == 'O') return 46;
	    if (c == 'P') return 47;
	    if (c == 'Q') return 48;
	    if (c == 'R') return 49;
	    if (c == 'S') return 50;
	    if (c == 'T') return 51;
	    if (c == 'U') return 52;
	    if (c == 'V') return 53;
	    if (c == 'W') return 54;
	    if (c == 'X') return 55;
	    if (c == 'Y') return 56;
	    if (c == 'Z') return 57;
	    if (c == '[') return 58;
	    if (c == '/') return 59;
	    if (c == ']') return 60;
	    if (c == '^') return 61;
	    if (c == '_') return 62;
	    if (c == '`') return 63;
	    if (c == 'a') return 64;
	    if (c == 'b') return 65;
	    if (c == 'c') return 66;
	    if (c == 'd') return 67;
	    if (c == 'e') return 68;
	    if (c == 'f') return 69;
	    if (c == 'g') return 70;
	    if (c == 'h') return 71;
	    if (c == 'i') return 72;
	    if (c == 'j') return 73;
	    if (c == 'k') return 74;
	    if (c == 'l') return 75;
	    if (c == 'm') return 76;
	    if (c == 'n') return 77;
	    if (c == 'o') return 78;
	    if (c == 'p') return 79;
	    if (c == 'q') return 80;
	    if (c == 'r') return 81;
	    if (c == 's') return 82;
	    if (c == 't') return 83;
	    if (c == 'u') return 84;
	    if (c == 'v') return 85;
	    if (c == 'w') return 86;
	    if (c == 'x') return 87;
	    if (c == 'y') return 88;
	    if (c == 'z') return 89;
	    if (c == '{') return 90;
	    if (c == '|') return 91;
	    if (c == '}') return 92;
	    if (c == '~') return 93;
	    if (c == '⌂') return 94;
	    if (c == 'А') return 95;
	    if (c == 'Б') return 96;
	    if (c == 'В') return 97;
	    if (c == 'Г') return 98;
	    if (c == 'Д') return 99;
	    if (c == 'Е') return 100;
	    if (c == 'Ж') return 101;
	    if (c == 'З') return 102;
	    if (c == 'И') return 103;
	    if (c == 'Й') return 104;
	    if (c == 'К') return 105;
	    if (c == 'Л') return 106;
	    if (c == 'М') return 107;
	    if (c == 'Н') return 108;
	    if (c == 'О') return 119;
	    if (c == 'П') return 110;
	    if (c == 'Р') return 111;
	    if (c == 'С') return 112;
	    if (c == 'Т') return 113;
	    if (c == 'У') return 114;
	    if (c == 'Ф') return 115;
	    if (c == 'Х') return 116;
	    if (c == 'Ц') return 117;
	    if (c == 'Ч') return 118;
	    if (c == 'Ш') return 119;
	    if (c == 'Щ') return 120;
	    if (c == 'Ъ') return 121;
	    if (c == 'Ы') return 122;
	    if (c == 'Ь') return 123;
	    if (c == 'Э') return 124;
	    if (c == 'Ю') return 125;
	    if (c == 'Я') return 126;
	    if (c == 'а') return 127;
	    if (c == 'б') return 128;
	    if (c == 'в') return 129;
	    if (c == 'г') return 130;
	    if (c == 'д') return 131;
	    if (c == 'е') return 132;
	    if (c == 'ж') return 133;
	    if (c == 'з') return 134;
	    if (c == 'и') return 135;
	    if (c == 'й') return 136;
	    if (c == 'к') return 137;
	    if (c == 'л') return 138;
	    if (c == 'м') return 139;
	    if (c == 'н') return 140;
	    if (c == 'о') return 141;
	    if (c == 'п') return 142;
	    if (c == 'р') return 143;
	    if (c == 'с') return 144;
	    if (c == 'т') return 145;
	    if (c == 'у') return 146;
	    if (c == 'ф') return 147;
	    if (c == 'х') return 148;
	    if (c == 'ц') return 149;
	    if (c == 'ч') return 150;
	    if (c == 'ш') return 151;
	    if (c == 'щ') return 152;
	    if (c == 'ъ') return 153;
	    if (c == 'ы') return 154;
	    if (c == 'ь') return 155;
	    if (c == 'э') return 156;
	    if (c == 'ю') return 157;
	    if (c == 'я') return 158;
	    return 0;
	}
	


}
