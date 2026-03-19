

import React, { useState, useEffect } from 'react';
import type { RightHolder, CatalogSong } from '../types';

// --- ICONS ---
const PlusCircle: React.FC<{ size?: number; className?: string }> = ({ size = 24, className }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>);
const Edit: React.FC<{ size?: number; className?: string }> = ({ size = 24, className }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>);
const Trash2: React.FC<{ size?: number; className?: string }> = ({ size = 24, className }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>);
const Save: React.FC<{ size?: number; className?: string }> = ({ size = 24, className }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>);
const XCircle: React.FC<{ size?: number; className?: string }> = ({ size = 24, className }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>);
const Info: React.FC<{ size?: number; className?: string }> = ({ size = 24, className }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>);
const ChevronDown: React.FC<{ size?: number; className?: string }> = ({ size = 24, className }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 12 15 18 9"></polyline></svg>);
const ChevronUp: React.FC<{ size?: number; className?: string }> = ({ size = 24, className }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="18 15 12 9 6 15"></polyline></svg>);
const BookOpen: React.FC<{ size?: number; className?: string }> = ({ size = 24, className }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>);
const ChevronLeft: React.FC<{ size?: number; className?: string }> = ({ size = 24, className }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="15 18 9 12 15 6"></polyline></svg>);

// --- Helper to Generate Dummy Song Data ---
const generateDummySongs = (count: number, artistPrefix: string, yearStart = 2020): CatalogSong[] => {
  const songs: CatalogSong[] = [];
  const genres = ['Pop', 'Rock', 'Dangdut', 'Hip-Hop', 'Electronic', 'Jazz', 'R&B', 'Indie'];
  const songwriters = ['Adi Nugroho', 'Bunga Citra', 'Candra Kirana', 'Dedi Kusuma', 'Eka Putri'];
  const composers = ['Fajar Pratama', 'Gita Lestari', 'Hadi Santoso', 'Indah Permata'];

  for (let i = 1; i <= count; i++) {
    const songTitle = `${artistPrefix} - Lagu Ke-${i}`;
    const artistName = `${artistPrefix} Band`;
    const songwriter = songwriters[Math.floor(Math.random() * songwriters.length)];
    const composer = composers[Math.floor(Math.random() * composers.length)];
    const isrc = `ID-${Math.random().toString(36).substr(2, 5).toUpperCase()}-${String(i).padStart(5, '0')}`;
    const releaseYear = yearStart + Math.floor(Math.random() * 5);
    const releaseMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const releaseDay = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    const releaseDate = `${releaseYear}-${releaseMonth}-${releaseDay}`;
    const durationMin = Math.floor(Math.random() * 3) + 2;
    const durationSec = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    const duration = `${durationMin}:${durationSec}`;
    const copyrightPLine = `© ${releaseYear} ${artistName}`;
    const copyrightCLine = `℗ ${releaseYear} ${songwriter} Publishing`;
    const notes = `Lagu ini adalah bagian dari album ${artistPrefix} Terbaik.`;

    songs.push({
      id: `song-${i}-${isrc}`,
      title: songTitle,
      artist: artistName,
      songwriter: songwriter,
      composer: composer,
      isrc: isrc,
      releaseDate: releaseDate,
      duration: duration,
      copyrightPLine: copyrightPLine,
      copyrightCLine: copyrightCLine,
      notes: notes,
      genre: genres[Math.floor(Math.random() * genres.length)],
      rightsHolders: [],
    });
  }
  return songs;
};

interface SongCatalogDetailProps {
    songs: CatalogSong[];
    onAddSong: (rightHolderId: string, song: CatalogSong) => void;
    onEditSong: (rightHolderId: string, song: CatalogSong) => void;
    onDeleteSong: (rightHolderId: string, songId: string) => void;
    rightHolderId: string;
}

// --- Song Catalog Component ---
const SongCatalogDetail: React.FC<SongCatalogDetailProps> = ({ songs, onAddSong, onEditSong, onDeleteSong, rightHolderId }) => {
  const [newSong, setNewSong] = useState<Omit<CatalogSong, 'id'>>({ title: '', artist: '', songwriter: '', composer: '', isrc: '', releaseDate: '', duration: '', copyrightPLine: '', copyrightCLine: '', notes: '', genre: '' });
  const [editingSongId, setEditingSongId] = useState<string | null>(null);
  const [currentEditSong, setCurrentEditSong] = useState<Partial<CatalogSong>>({});
  const [message, setMessage] = useState('');
  const [expandedSongId, setExpandedSongId] = useState<string | null>(null);

  const generateDummyIsrc = () => `ID-${Math.random().toString(36).substr(2, 5).toUpperCase()}-${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`;

  const handleAddSongSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSong.title || !newSong.artist || !newSong.songwriter || !newSong.releaseDate) {
      setMessage('Judul, Artis, Penulis Lagu, dan Tanggal Rilis wajib diisi!');
      return;
    }
    const songToAdd: CatalogSong = { ...newSong, id: `song-${Date.now()}`, isrc: newSong.isrc || generateDummyIsrc() };
    onAddSong(rightHolderId, songToAdd);
    setNewSong({ title: '', artist: '', songwriter: '', composer: '', isrc: '', releaseDate: '', duration: '', copyrightPLine: '', copyrightCLine: '', notes: '', genre: '' });
    setMessage('Lagu baru berhasil ditambahkan! ✅');
    setTimeout(() => setMessage(''), 3000);
  };
  
  const handleEditClick = (song: CatalogSong) => { setEditingSongId(song.id); setCurrentEditSong({ ...song }); };
  const handleChangeEdit = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setCurrentEditSong(prev => ({ ...prev, [e.target.name]: e.target.value })); };
  const handleSaveEdit = () => { onEditSong(rightHolderId, currentEditSong as CatalogSong); setEditingSongId(null); setCurrentEditSong({}); setMessage('Perubahan lagu berhasil disimpan! ✅'); setTimeout(() => setMessage(''), 3000); };
  const handleCancelEdit = () => { setEditingSongId(null); setCurrentEditSong({}); };
  const handleDeleteClick = (songId: string) => { if (window.confirm('Yakin mau hapus lagu ini?')) { onDeleteSong(rightHolderId, songId); setMessage('Lagu berhasil dihapus! 🗑️'); setTimeout(() => setMessage(''), 3000); } };

  return (
    <div className="p-6 bg-ui-surface/50 rounded-lg border border-ui-border space-y-6">
      <h3 className="text-2xl font-bold text-ui-text-heading mb-4 flex items-center"><BookOpen size={24} className="mr-2 text-primary" /> Katalog Lagu</h3>
      {message && <div className={`p-3 rounded-md text-sm ${message.includes('berhasil') ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-400'}`}>{message}</div>}
      
      <div className="bg-ui-surface p-4 rounded-md border border-ui-border">
        <h4 className="text-lg font-semibold text-ui-text-heading mb-3">Tambah Lagu Baru</h4>
        <form onSubmit={handleAddSongSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" value={newSong.title} onChange={(e) => setNewSong({ ...newSong, title: e.target.value })} className="w-full p-2 rounded-md bg-ui-bg border border-ui-border text-white form-input-glow" placeholder="Judul Lagu" />
          <input type="text" value={newSong.artist} onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })} className="w-full p-2 rounded-md bg-ui-bg border border-ui-border text-white form-input-glow" placeholder="Artis" />
          <input type="text" value={newSong.songwriter} onChange={(e) => setNewSong({ ...newSong, songwriter: e.target.value })} className="w-full p-2 rounded-md bg-ui-bg border border-ui-border text-white form-input-glow" placeholder="Penulis Lagu" />
          <input type="date" value={newSong.releaseDate} onChange={(e) => setNewSong({ ...newSong, releaseDate: e.target.value })} className="w-full p-2 rounded-md bg-ui-bg border border-ui-border text-white form-input-glow" />
          <div className="md:col-span-2"><button type="submit" className="w-full btn-glow-primary py-2 rounded-md font-semibold flex items-center justify-center"><PlusCircle size={20} className="mr-2" /> Tambahkan</button></div>
        </form>
      </div>
      
      <div className="bg-ui-surface p-4 rounded-md border border-ui-border">
        <h4 className="text-lg font-semibold text-ui-text-heading mb-3">Daftar Lagu ({songs.length})</h4>
        <div className="space-y-3">{songs.map(song => (<div key={song.id} className="bg-ui-bg p-3 rounded-md border border-ui-border/50"><div className="flex justify-between items-center"><p className="font-semibold text-white text-lg">{song.title} <span className="text-gray-400 text-sm">oleh {song.artist}</span></p><div className="flex space-x-2"><button onClick={() => handleEditClick(song)} className="p-2 rounded-md bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 transition-colors" title="Edit"><Edit size={16} /></button><button onClick={() => handleDeleteClick(song.id)} className="p-2 rounded-md bg-red-600/20 hover:bg-red-600/40 text-red-400 transition-colors" title="Hapus"><Trash2 size={16} /></button><button onClick={() => setExpandedSongId(expandedSongId === song.id ? null : song.id)} className="p-2 rounded-md bg-gray-500/20 hover:bg-gray-500/40 text-gray-300 transition-colors" title="Detail">{expandedSongId === song.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</button></div></div>{expandedSongId === song.id && (<div className="mt-3 text-sm text-gray-300 space-y-1 animate-fade-in"><p><strong>ISRC:</strong> <span className="text-primary">{song.isrc}</span></p><p><strong>Tanggal Rilis:</strong> {song.releaseDate}</p></div>)}</div>))}</div>
      </div>
    </div>
  );
};

interface RightHolderDetailProps {
    rightHolder: RightHolder;
    onBack: () => void;
    onAddSong: (rightHolderId: string, song: CatalogSong) => void;
    onEditSong: (rightHolderId: string, song: CatalogSong) => void;
    onDeleteSong: (rightHolderId: string, songId: string) => void;
    onUpdateRightHolder: (rightHolder: RightHolder) => void;
}

const RightHolderDetail: React.FC<RightHolderDetailProps> = ({ rightHolder, onBack, onAddSong, onEditSong, onDeleteSong, onUpdateRightHolder }) => {
    return (
        <div className="space-y-8">
            <button onClick={onBack} className="flex items-center text-primary hover:underline transition-colors mb-6"><ChevronLeft size={20} className="mr-2" /> Kembali ke Daftar</button>
            <h2 className="text-3xl font-bold text-gradient-primary">{rightHolder.name}</h2>
            <SongCatalogDetail songs={rightHolder.catalog || []} onAddSong={onAddSong} onEditSong={onEditSong} onDeleteSong={onDeleteSong} rightHolderId={rightHolder.id} />
        </div>
    );
};

interface RightHoldersListProps {
    rightHolders: RightHolder[];
    onSelectRightHolder: (id: string) => void;
    onAddRightHolder: (data: Omit<RightHolder, 'id' | 'catalog'>) => void;
    onDeleteRightHolder: (id: string) => void;
}

const RightHoldersList: React.FC<RightHoldersListProps> = ({ rightHolders, onSelectRightHolder, onAddRightHolder, onDeleteRightHolder }) => {
  const [newRightHolder, setNewRightHolder] = useState({ name: '', type: '', email: '' });
  const [message, setMessage] = useState('');
  const handleAddSubmit = (e: React.FormEvent) => { e.preventDefault(); if (!newRightHolder.name || !newRightHolder.type || !newRightHolder.email) { setMessage('Nama, Tipe, dan Email wajib diisi!'); return; } onAddRightHolder(newRightHolder); setNewRightHolder({ name: '', type: '', email: '' }); setMessage('Pemegang hak baru berhasil ditambahkan! ✅'); setTimeout(() => setMessage(''), 3000); };
  const handleDeleteClick = (id: string) => { if (window.confirm('Yakin mau hapus pemegang hak ini?')) { onDeleteRightHolder(id); setMessage('Pemegang hak berhasil dihapus! 🗑️'); setTimeout(() => setMessage(''), 3000); }};

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gradient-primary">Manajemen Pemegang Hak</h2>
      {message && <div className={`p-4 rounded-md text-sm ${message.includes('berhasil') ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-400'}`}>{message}</div>}
      
      <div className="bg-ui-surface/50 p-6 rounded-lg border border-ui-border">
        <h3 className="text-xl font-bold text-ui-text-heading mb-4">Tambah Pemegang Hak Baru</h3>
        <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" value={newRightHolder.name} onChange={(e) => setNewRightHolder({ ...newRightHolder, name: e.target.value })} className="w-full p-2 rounded-md bg-ui-bg border border-ui-border text-white form-input-glow" placeholder="Nama Pemegang Hak" />
          <input type="text" value={newRightHolder.type} onChange={(e) => setNewRightHolder({ ...newRightHolder, type: e.target.value })} className="w-full p-2 rounded-md bg-ui-bg border border-ui-border text-white form-input-glow" placeholder="Tipe (Label/Publisher)" />
          <input type="email" value={newRightHolder.email} onChange={(e) => setNewRightHolder({ ...newRightHolder, email: e.target.value })} className="w-full p-2 rounded-md bg-ui-bg border border-ui-border text-white form-input-glow" placeholder="Email Kontak" />
          <div className="md:col-span-2"><button type="submit" className="w-full btn-glow-primary py-2 rounded-md font-semibold">Tambah</button></div>
        </form>
      </div>

      <div className="bg-ui-surface rounded-xl border border-ui-border overflow-x-auto">
        <table className="min-w-full table-auto text-left text-gray-300">
            <thead><tr className="bg-ui-bg/50"><th className="px-4 py-2">Nama</th><th className="px-4 py-2">Tipe</th><th className="px-4 py-2">Jumlah Lagu</th><th className="px-4 py-2">Aksi</th></tr></thead>
            <tbody>{rightHolders.map(rh => (<tr key={rh.id} className="border-b border-ui-border hover:bg-ui-border/20"><td className="px-4 py-2 font-semibold text-white">{rh.name}</td><td className="px-4 py-2">{rh.type}</td><td className="px-4 py-2 text-primary">{rh.catalog?.length || 0}</td><td className="px-4 py-2 flex space-x-2"><button onClick={() => onSelectRightHolder(rh.id)} className="p-2 rounded-md bg-blue-600/20 hover:bg-blue-600/40 text-blue-300" title="Detail"><Info size={16} /></button><button onClick={() => handleDeleteClick(rh.id)} className="p-2 rounded-md bg-red-600/20 hover:bg-red-600/40 text-red-400" title="Hapus"><Trash2 size={16} /></button></td></tr>))}</tbody>
        </table>
      </div>
    </div>
  );
};

const RightHoldersView = () => {
    const [rightHolders, setRightHolders] = useState<RightHolder[]>(() => {
    try {
      const storedData = localStorage.getItem('leherRightHoldersCatalog');
      if (storedData) return JSON.parse(storedData);
      return [
          { id: 'RH001', name: 'Sony Music Entertainment', type: 'Label Rekaman Internasional', email: 'contact@sonymusic.com', catalog: generateDummySongs(50, 'Sony Artist'), },
          { id: 'RH002', name: 'Warner Chappell Music', type: 'Publisher Musik Internasional', email: 'info@warnerchappell.com', catalog: generateDummySongs(70, 'Warner Writer'), },
          { id: 'RH003', name: 'Nagaswara', type: 'Label Rekaman & Publisher Musik Indonesia', email: 'info@nagaswara.co.id', catalog: generateDummySongs(100, 'Nagaswara Artist'), },
          { id: 'RH004', name: 'Trinity Optima Production', type: 'Label Rekaman & Publisher Musik Indonesia', email: 'info@trinityoptima.com', catalog: generateDummySongs(80, 'Trinity Artist'), },
          { id: 'RH005', name: 'Musica Studios', type: 'Label Rekaman Indonesia', email: 'info@musica.id', catalog: generateDummySongs(60, 'Musica Artist'), },
      ];
    } catch (error) { console.error("Gagal membaca data:", error); return []; }
  });

  const [selectedRightHolderId, setSelectedRightHolderId] = useState<string | null>(null);

  useEffect(() => {
    try { localStorage.setItem('leherRightHoldersCatalog', JSON.stringify(rightHolders)); } catch (error) { console.error("Gagal menyimpan data:", error); }
  }, [rightHolders]);

  const handleAddRightHolder = (newRhData: Omit<RightHolder, 'id' | 'catalog'>) => {
    const newId = `RH${String(rightHolders.length > 0 ? Math.max(...rightHolders.map(rh => parseInt(rh.id.replace('RH', ''), 10))) + 1 : 1).padStart(3, '0')}`;
    setRightHolders(prev => [...prev, { ...newRhData, id: newId, catalog: [] }]);
  };

  const handleDeleteRightHolder = (idToDelete: string) => {
    setRightHolders(prev => prev.filter(rh => rh.id !== idToDelete));
    if (selectedRightHolderId === idToDelete) setSelectedRightHolderId(null);
  };

  const handleAddSongToCatalog = (rightHolderId: string, newSong: CatalogSong) => { setRightHolders(prev => prev.map(rh => rh.id === rightHolderId ? { ...rh, catalog: [...(rh.catalog || []), newSong] } : rh)); };
  const handleEditSongInCatalog = (rightHolderId: string, updatedSong: CatalogSong) => { setRightHolders(prev => prev.map(rh => rh.id === rightHolderId ? { ...rh, catalog: (rh.catalog || []).map(song => song.id === updatedSong.id ? updatedSong : song) } : rh)); };
  const handleDeleteSongFromCatalog = (rightHolderId: string, songIdToDelete: string) => { setRightHolders(prev => prev.map(rh => rh.id === rightHolderId ? { ...rh, catalog: (rh.catalog || []).filter(song => song.id !== songIdToDelete) } : rh)); };
  const handleUpdateRightHolderInfo = (updatedRh: RightHolder) => { setRightHolders(prev => prev.map(rh => rh.id === updatedRh.id ? updatedRh : rh)); };

  const selectedRightHolder = rightHolders.find(rh => rh.id === selectedRightHolderId);

  return (
    <div className="animate-fade-in">
      {selectedRightHolder ? (
        <RightHolderDetail
          rightHolder={selectedRightHolder}
          onBack={() => setSelectedRightHolderId(null)}
          onAddSong={handleAddSongToCatalog}
          onEditSong={handleEditSongInCatalog}
          onDeleteSong={handleDeleteSongFromCatalog}
          onUpdateRightHolder={handleUpdateRightHolderInfo}
        />
      ) : (
        <RightHoldersList
          rightHolders={rightHolders}
          onSelectRightHolder={setSelectedRightHolderId}
          onAddRightHolder={handleAddRightHolder}
          onDeleteRightHolder={handleDeleteRightHolder}
        />
      )}
    </div>
  );
};
export default RightHoldersView;
