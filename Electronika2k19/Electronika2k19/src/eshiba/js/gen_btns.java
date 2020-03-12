package eshiba.js;

public class gen_btns {
	
	static public void main(String [] argc) {
		
		
		String [] src = {
				"F1","F2","F3","F4","F5","BLD","RUN","LOAD","","",
				"0/I","1","2","3","4","5","*","+","","",
				"RES","6","7","8","9","0","/","-","","",
				"A","B","W","G","D","E","V","Z","","",
				"I","J","K","L","M","N","O","P","","",
				"R","S","T","U","G","H","C","ENT","","",
				"[","]","X","Y","_","\\","|","STEP","","",
				"","UP","","","","",":",";","","",
				"LEF","DOW","RHT","","","","","","",""
};


String [] names = {
		"LOAD","BLD","STEP","RUN","RES","","","7","8","9",
		"ESC","F1","F2","F3","F4","F5","F6","4","5","6",
		"Q","W","E","R","T","Y","U","1","2","3",
		"A","S","D","H","J","K","L","I","0",".",
		"Z","X","C","V","B","N","M","BAC","+","-",
		"","","","","I","O","P","","*","/",
		"","","","","","","","","Y","",
		"","UP","","","","","","X","ENTER","B",
		"LEFT","DOWN","RIGHT","","SPASE","","","","A",""
		
};

		
		System.out.println("<table style=\"border: 1rem solid #D9CED6 \">");
		
		for(int y = 0; y < 9;y++) {
			System.out.println("<tr>");
			for(int x = 0; x < 10;x++) {
				System.out.print("<td>"); 
				System.out.print("<button onclick=\"KEYBOARD_WRITE_CHAR('" + names[x+y*10] + "')\" class=\"btn btn-dark\" style=\"height:25px;width:50px;margin:0px; padding:0px;\">"+ names[x+y*10] + "</button>"); 
				System.out.print("</td>"); 
			}
			System.out.println("</tr>");
		}
		
		System.out.println("</table>");
	}

}
