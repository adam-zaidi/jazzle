const {
  Accidental,
  Renderer,
  Stave,
  StaveNote,
  StaveTie,
  Voice,
  Annotatation,
  Articulation,
  Beam,
  Formatter,
  ModifierPosition,
  Dot,
} = Vex.Flow;

function draw_bar(bar,div,time_sig,key_sig,notas,first) {
  const renderer = new Renderer(div, Renderer.Backends.SVG);
  
  renderer.resize(300, 60);
  const context = renderer.getContext();
  context.setFont('Arial', 10);
  context.scale(0.7,0.7);
  
  const stave = new Stave(20, -20, 380);
  if (first) {};
  stave.addClef('treble').setTimeSignature(time_sig).setKeySignature(key_sig)
  stave.setContext(context).draw();
  
  const note_arr = [];
  const ties = [];

  for (var i = 0; i < notas.length-1; i++) {
    note_arr.push(new StaveNote({keys: [notas[i][0]], duration: notas[i][1]}))

    if (notas[i].length > 2) {
      for (var j = 2; j < notas[i].length; j++) {

        if (notas[i][j] == 'dotted') {
          note_arr[i] = dotted(
            new StaveNote({keys: [notas[i][0]], duration: notas[i][1]})
          )
        }
        
        if (notas[i][j] == 'flat') {
          note_arr[i].addModifier(new Accidental('b'))
        } else if (notas[i][j] == 'sharp') {
          note_arr[i].addModifier(new Accidental('#'))
        } else if (notas[i][j] == 'natural') {
          note_arr[i].addModifier(new Accidental('n'))
        }

        if (notas[i][j] == 'staccato') {
          note_arr[i].addModifier(new Articulation('a.'))
        }

        if (notas[i][j] == 'accent') {
          note_arr[i].addModifier(new Articulation('a>'))
        }

        if (notas[i][j] == 'marcato') {
          note_arr[i].addModifier(new Articulation('a-'))
        }
        
        if (notas[i][j] == 'fermata') {
          note_arr[i].addModifier(new Articulation('a@a').setPosition(ModifierPosition.ABOVE))
        }
        
        if (notas[i][j].startsWith('tie')) {
          if (notas[i][j][3] == 'n') {
            ties.push(new StaveTie({
              last_note: note_arr[i],
              first_indices: [0],
              last_indices: [0],
            }))
          } else if (notas[i][j].endsWith('n')) {
            ties.push(new StaveTie({
              first_note: note_arr[parseInt(notas[i][j][3])],
              first_indices: [0],
              last_indices: [0],
            }))
          } else {
            ties.push(new StaveTie({
              first_note: note_arr[i][parseInt(notas[i][j][3])],
              last_note: note_arr[i][note_arr[i].length-1],
            }))
          }

          
        }
      }
    }   
  }
  
  const voices = [];

  if (notas[notas.length-1]) {
    const beams = Beam.generateBeams(note_arr);
    Formatter.FormatAndDraw(context, stave, note_arr);
    beams.forEach((b) => {
      b.setContext(context).draw();
    });
  } else {
    const voice = new Voice({
      num_beats: parseInt(time_sig.substr(0,time_sig.indexOf('/'))),
      beat_value: parseInt(time_sig.substr(time_sig.indexOf('/')+1)),
    })
    voice.addTickables(note_arr);
  
    new Formatter().joinVoices([voice]).format([voice], 250);
  
    // Render voice
    voice.draw(context, stave);
  }
  ties.forEach((t) => {
      t.setContext(context).draw();
  });

  
}

function dotted(staveNote, noteIndex = -1) {
    if (noteIndex < 0) {
        Dot.buildAndAttach([staveNote], {
            all: true,
        });
    } else {
        Dot.buildAndAttach([staveNote], {
            index: noteIndex,
        });
    }
    return staveNote;
}

// draw_bar(1, document.getElementById('img1'), '2/4', 'Eb', [['b/4','8r'],['g/4','8'],['g/4','8'],['g/4','8'],true], true)
// draw_bar(2, document.getElementById('img2'), '2/4', 'Eb', [['e/4','2','fermata'], false])
// draw_bar(3, document.getElementById('img3'), '2/4', 'Eb', [['b/4','8r'],['f/4','8'],['f/4','8'],['f/4','8'],true], false)
// draw_bar(4, document.getElementById('img4'), '2/4', 'Eb', [['d/4','2','tie0-n'], false], false)
// draw_bar(5, document.getElementById('img5'), '2/4', 'Eb', [['d/4','2','fermata','tien-0'],false], false)
// draw_bar(6, document.getElementById('img6'), '2/4', 'Eb', [['b/4','8r'],['g/4','8'],['g/4','8'],['g/4','8'],true], false)


for (var i = 0; i < 6; i++) {
  draw_bar(i+1, document.getElementById('img' + (i+1).toString()), correct_data[2], correct_data[3], correct_data[i+4])
}


