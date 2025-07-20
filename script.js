body {
    font-family: Arial, sans-serif;
    padding: 20px;
    background: white;
    color: #333;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
    margin-bottom: 25px;
  }
  
  .filters label {
    display: flex;
    flex-direction: column;
    font-size: 14px;
  }
  
  .ipa-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
    gap: 10px;
    max-width: 800px;
    margin: auto;
  }
  
  .ipa-symbol {
    padding: 15px;
    background: white;
    border: 2px solid #ccc;
    text-align: center;
    font-size: 18px;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  
  .ipa-symbol.match {
    background-color: #c1f0d2;
    border-color: #34a853;
    font-weight: bold;
  }
  