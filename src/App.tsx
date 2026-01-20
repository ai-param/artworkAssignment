import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useRef, useState } from 'react';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputNumber } from 'primereact/inputnumber';
import 'primeicons/primeicons.css';

interface ArtWork{
  id:number;
  title:string;
  place_of_origin:string;
  artist_display:string;
  inscription:string;
  date_start:number;
  date_end:number;
}

interface ApiResponse{
  data:ArtWork[];
  pagination:{
    total:number;
    limit:number;
    offset:number;
    total_pages:number;
    current_page:number;
  }
}

function App() {
  const [artwork,setArtwork] = useState<ArtWork[]>([]);
  const [selectedArtWorks,setSelectedArtWorks] = useState<ArtWork[]>([]);
  const [loading,setLoading] = useState(false);
  const [totalRecords,setTotalRecords] = useState(0);
  const [currentPage,setCurrentPage] = useState(0);
  const [customSelectionCount,setCustomSelectionCount] = useState<number>(0);

  const rowsPerPage = 12;

  const op = useRef<OverlayPanel>(null);
  const inputRef = useRef<number | null>(null);

  const handleCustomSelectSubmit = () => {
        const count = inputRef.current || 0;
        setCustomSelectionCount(count);
        op.current?.hide();
    };

  const fetchArtworks = async (page:number)=>{
    setLoading(true);
    try{
      const apiPage = page + 1;
      const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${apiPage}&limit=${rowsPerPage}&fields=id,title,place_of_origin,artist_display,inscriptions,date_start,date_end`);
      const data:ApiResponse = await response.json();
      setArtwork(data.data);
      setTotalRecords(data.pagination.total);
    }catch(err){
      console.error('Error fetching artworks:',err);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchArtworks(currentPage);
  },[currentPage])

  useEffect(()=>{
    if (customSelectionCount > 0) {
            const newSelections = [...selectedArtWorks];
            let hasChanges = false;
            artwork.forEach((artwork, index) => {
                const globalIndex = currentPage * rowsPerPage + index;
                if (globalIndex < customSelectionCount) {
                    const isAlreadySelected = selectedArtWorks.some(item => item.id === artwork.id);
                    if (!isAlreadySelected) {
                        newSelections.push(artwork);
                        hasChanges = true;
                    }
                }
            });
            if (hasChanges) {
                setSelectedArtWorks(newSelections);
            }
    }
  },[selectedArtWorks,customSelectionCount])

  const handlePage = (page:any)=>{
    setCurrentPage(page.page);
  }

  const handleSelect = (select:any)=>{
    setSelectedArtWorks(select.value);
  }

  const headerTemplate = () => {
    return (
      <div>
          <Button 
              type="button" 
              icon="pi pi-chevron-down"
              rounded text
              onClick={(e) => op.current?.toggle(e)} 
          />
          <OverlayPanel ref={op}>
              <div>
                  <h4>Select Multiple Rows</h4>
                  <p>Enter number of rows to select across all pages</p>
                  <div style={{display:"flex",gap:"20px"}}>
                      <InputNumber 
                          placeholder="e.g.,20" 
                          onValueChange={(e:any) => inputRef.current = e.value} 
                      />
                      <Button label="Select" onClick={handleCustomSelectSubmit} />
                  </div>
              </div>
          </OverlayPanel>
      </div>
    )
  }

  return (
    <div style={{padding:'2rem',maxWidth:'1400px',margin:'0 auto'}}>
    <div style={{marginBottom:'2rem'}}>
     {selectedArtWorks.length >= 0 && (
          <div style={{ 
            marginTop: '1rem', 
            padding: '0.75rem 1rem', 
            background: '#dbeafe', 
            borderRadius: '0.5rem',
            color: '#1e40af',
            fontSize: '0.9rem'
          }}>
            selected: <strong>{selectedArtWorks.length}</strong> rows
          </div>
        )}
    </div>
      <DataTable 
        value={artwork}
        tableStyle={{minWidth:'50rem'}}
        selection={selectedArtWorks}
        onSelectionChange={handleSelect}
        selectionMode={'checkbox'}
        dataKey={'id'}
        paginator
        lazy
        rows={rowsPerPage}
        totalRecords={totalRecords}
        loading={loading}
        first={rowsPerPage*currentPage}
        onPage={handlePage}
        stripedRows
        paginatorTemplate="CurrentPageReport PrevPageLink PageLinks NextPageLink"
        currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
        paginatorLeft
        paginatorClassName='custom-paginator'
      >
        <Column
          selectionMode='multiple'
          headerStyle={{width:'3rem'}}
          header={headerTemplate}
        />
        <Column 
          field='title'
          header="TITLE"
          style={{minWidth:'250px',fontWeight:'bold'}}
          body={(rowData)=>rowData.title || 'Untitled'}
        />
        <Column
          field='place_of_origin'
          header='PLACE OF ORIGIN'
          style={{minWidth:'150px'}}
          body={(rowData)=>rowData.place_of_origin || 'N/A'}
        />
        <Column
          field='artist_display'
          header='ARTIST'
          style={{maxWidth:'200px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}
          body={(rowData)=>rowData.artist_display || 'Unknown'}
        />
        <Column
          field='inscriptions'
          header='INSCRIPTIONS'
          style={{minWidth:'200px'}}
          body={(rowData)=>rowData.inscriptions || 'None'}
        />
        <Column
          field='date_start'
          header='START DATE'
          style={{minWidth:'120px'}}
          body={(rowData)=>rowData.date_start || 'N/A'}
        />
        <Column
          field='date_end'
          header='END DATE'
          style={{minWidth:'120px'}}
          body={rowData=>rowData.date_end || 'N/A'}
        />
      </DataTable>
    </div>
  )
}

export default App
