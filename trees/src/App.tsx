import { useEffect, useState, useRef } from 'react';
import { BinarySearchTree, type D3TreeNode } from './data-structures/BinarySearchTree';
import { TreeVisualizer } from './components/TreeVisualizer/TreeVisualizer';
import './App.css';

function App() {
  const [treeData, setTreeData] = useState<D3TreeNode | null>(null);
  const [traversals, setTraversals] = useState({
    inOrder: [] as number[],
    postOrder: [] as number[],
    preOrder: [] as number[]
  });
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResult, setSearchResult] = useState<boolean | null>(null);
  const bstRef = useRef<BinarySearchTree>(new BinarySearchTree());

  useEffect(() => {
    const bst = bstRef.current;
    const sequence = [25, 15, 50, 10, 22, 35, 70, 4, 12, 18, 24, 31, 44, 66, 90];

    sequence.forEach(num => bst.insert(num));

    setTraversals({
      inOrder: bst.inOrder(),
      postOrder: bst.postOrder(),
      preOrder: bst.preOrder()
    });

    setTreeData(bst.toD3Format());
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(searchValue, 10);
    if (!isNaN(num)) {
      const found = bstRef.current.contains(num);
      setSearchResult(found);
    } else {
      setSearchResult(null);
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>Challenge 08: Binary Search Tree</h1>

      <section style={{ padding: '1rem', backgroundColor: '#f0f4f8', borderRadius: '8px', marginBottom: '2rem' }}>
        <h2>1. Recorridos del Árbol</h2>
        <p><strong>Inorder:</strong> {traversals.inOrder.join(' - ')}</p>
        <p><strong>Postorder:</strong> {traversals.postOrder.join(' - ')}</p>
        <p><strong>Preorder:</strong> {traversals.preOrder.join(' - ')}</p>
      </section>

      <section style={{ padding: '1rem', backgroundColor: '#eefcf1', borderRadius: '8px', marginBottom: '2rem' }}>
        <h2>2. Búsqueda de Valores</h2>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <input
            type="number"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Ingresa un número..."
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
            Verificar Existencia
          </button>
        </form>
        {searchResult !== null && (
          <div style={{ marginTop: '1rem', fontWeight: 'bold', color: searchResult ? '#155724' : '#721c24' }}>
            {searchResult
              ? `El valor ${searchValue} sí se encuentra en el árbol.`
              : `El valor ${searchValue} no existe en el árbol.`}
          </div>
        )}
      </section>

      <section>
        <h2>3. Visualización con react-d3-tree</h2>
        <TreeVisualizer data={treeData} />
      </section>
    </main>
  );
}

export default App;