//VERSION 1.0

package eshiba;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;

public class Txt {

	//Читает файл целиком
	static public String ReadFile(String path) throws IOException{	
		  String filesrc = "";	
		  BufferedReader br = new BufferedReader(new FileReader(new File(path)));   
		  String st; 	  
		  String comment_src = "";
		  while ((st = br.readLine()) != null) {
			  filesrc = filesrc + st + "\n";
		  }	  
		  br.close();	  
		  return filesrc;		
		}
	
}
