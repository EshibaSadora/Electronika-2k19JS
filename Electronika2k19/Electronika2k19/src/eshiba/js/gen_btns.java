package eshiba.js;

public class gen_btns {
	
	static public void main(String [] argc) {
		
		
		String [] src = {"0/I","1","2","3","4","5",":",";",
				"res","6","7","8","9","0","/","-",
				"A","B","W","G","D","E","V","Z",
				"I","J","K","L","M","N","O","P",
				"R","S","T","U","G","H","C","ENT",
				"[","]","X","Y","_","\\","|","|>",
				"","UP","","","","","","",
				"LEF","DOW","RHT","","","","",""
};


String [] names = {"TURNON","1","2","3","4","5",":",";",
		"res","6","7","8","9","0","/","-",
		"A","B","W","G","D","E","V","Z",
		"I","J","K","L","M","N","O","P",
		"R","S","T","U","G","H","C","ENTER",
		"[","]","X","Y","_","\\","|","|>",
		"","UP","","","","","","",
		"LEFT","DOWN","RIGHT","","","","",""
};

		
		System.out.println("<table style=\"border: 1rem solid #D9CED6 \">");
		
		for(int y = 0; y < 8;y++) {
			System.out.println("<tr>");
			for(int x = 0; x < 8;x++) {
				System.out.print("<td>"); 
				System.out.print("<button onclick=\"KEYBOARD_WRITE_CHAR('" + names[x+y*8] + "')\" class=\"btn btn-dark\" style=\"height:30px;width:40px;margin:0px; padding:0px;\">"+ src[x+y*8] + "</button>"); 
				System.out.print("</td>"); 
			}
			System.out.println("</tr>");
		}
		
		System.out.println("</table>");
	}

}
