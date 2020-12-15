SELECT z_e_k._id as z_e_k_id,
    	z_e_k.aktuakna_Temperatura, 
        z_e_k.procent_Wykorzystanych_Zasobow, 
        z_e_k.aktualna_Szybkosc_Przekazania_Danych,
        z_e_k.typPolaczenia,
        komp._id as komp_id,
        komp.model,
        komp.zaintstalowany_System_Operacyjny, 		
        komp.data_Stworzenia,
        e._id as element_id, e.nazwa, e.opis, e.foto_Path
        FROM Zestaw_Elementow_Komputera z_e_k 
        left join Element_komputera e on z_e_k.element_id = e._id
        left join Komputer komp on z_e_k.computer_id = komp._id
    
