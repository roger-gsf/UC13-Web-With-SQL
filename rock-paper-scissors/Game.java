import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import javax.swing.JOptionPane;

public class Game extends javax.swing.JFrame {

    public Game() {
        initComponents();

        jRadioBtnRock.addItemListener(new ItemListener() {
            public void itemStateChanged(ItemEvent e) {
                if (e.getStateChange() == ItemEvent.SELECTED) {
                    jRadioBtnPaper.setEnabled(false);
                    jRadioBtnScissors.setEnabled(false);
                } else if (e.getStateChange() == ItemEvent.DESELECTED) {
                    jRadioBtnPaper.setEnabled(true);
                    jRadioBtnScissors.setEnabled(true);
                }
            }
        });

        jRadioBtnPaper.addItemListener(new ItemListener() {
            public void itemStateChanged(ItemEvent e) {
                if (e.getStateChange() == ItemEvent.SELECTED) {
                    jRadioBtnRock.setEnabled(false);
                    jRadioBtnScissors.setEnabled(false);
                } else if (e.getStateChange() == ItemEvent.DESELECTED) {
                    jRadioBtnRock.setEnabled(true);
                    jRadioBtnScissors.setEnabled(true);
                }
            }
        });

        jRadioBtnScissors.addItemListener(new ItemListener() {
            public void itemStateChanged(ItemEvent e) {
                if (e.getStateChange() == ItemEvent.SELECTED) {
                    jRadioBtnRock.setEnabled(false);
                    jRadioBtnPaper.setEnabled(false);
                } else if (e.getStateChange() == ItemEvent.DESELECTED) {
                    jRadioBtnRock.setEnabled(true);
                    jRadioBtnPaper.setEnabled(true);
                }
            }
        });
    }

    // <editor-fold defaultstate="collapsed" desc="Generated Code">                          
    private void initComponents() {

        lblTitle = new javax.swing.JLabel();
        lblChosse = new javax.swing.JLabel();
        jRadioBtnRock = new javax.swing.JRadioButton();
        jRadioBtnPaper = new javax.swing.JRadioButton();
        jRadioBtnScissors = new javax.swing.JRadioButton();
        btnShoot = new javax.swing.JButton();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);

        lblTitle.setFont(new java.awt.Font("Segoe UI", 3, 24)); // NOI18N
        lblTitle.setText("                      Rock, Paper, Scissors");

        lblChosse.setText("Lest's play! Chosse:");

        jRadioBtnRock.setText("Rock");

        jRadioBtnPaper.setText("Paper");

        jRadioBtnScissors.setText("Scissors");

        btnShoot.setText("SHOOT!");
        btnShoot.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnShootActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(lblTitle, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.DEFAULT_SIZE, 500, Short.MAX_VALUE)
            .addGroup(layout.createSequentialGroup()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createSequentialGroup()
                        .addGap(218, 218, 218)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                            .addComponent(jRadioBtnScissors, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                            .addComponent(jRadioBtnRock, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                            .addComponent(jRadioBtnPaper, javax.swing.GroupLayout.PREFERRED_SIZE, 65, javax.swing.GroupLayout.PREFERRED_SIZE)))
                    .addGroup(layout.createSequentialGroup()
                        .addGap(198, 198, 198)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                            .addComponent(lblChosse, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                            .addComponent(btnShoot, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))))
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(lblTitle, javax.swing.GroupLayout.PREFERRED_SIZE, 73, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(lblChosse, javax.swing.GroupLayout.PREFERRED_SIZE, 22, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addComponent(jRadioBtnRock, javax.swing.GroupLayout.PREFERRED_SIZE, 21, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jRadioBtnPaper)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jRadioBtnScissors)
                .addGap(18, 18, 18)
                .addComponent(btnShoot, javax.swing.GroupLayout.PREFERRED_SIZE, 35, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(53, Short.MAX_VALUE))
        );

        pack();
        setLocationRelativeTo(null);
    }// </editor-fold>                        

    private void btnShootActionPerformed(java.awt.event.ActionEvent evt) {                                         
        if (!jRadioBtnRock.isSelected() && !jRadioBtnPaper.isSelected() && !jRadioBtnScissors.isSelected()) {
            JOptionPane.showMessageDialog(null, "Please select an option.", "Error", JOptionPane.ERROR_MESSAGE);
            return;
        }

        String userChoice = "";
        if (jRadioBtnRock.isSelected()) {
            userChoice = "Rock";
        } else if (jRadioBtnPaper.isSelected()) {
            userChoice = "Paper";
        } else if (jRadioBtnScissors.isSelected()) {
            userChoice = "Scissors";
        }

        int machineChoiceIndex = randInt(0, 2);
        String[] choices = {"Rock", "Paper", "Scissors"};
        String machineChoice = choices[machineChoiceIndex];

        determineWinner(userChoice, machineChoice);

        jRadioBtnRock.setSelected(false);
        jRadioBtnPaper.setSelected(false);
        jRadioBtnScissors.setSelected(false);
    }                                        

    public int randInt(int min, int max) {
        java.util.Random rand = new java.util.Random();
        int randomNum = rand.nextInt((max - min) + 1) + min;
        return randomNum;
    }

    public void determineWinner(String userChoice, String machineChoice) {
        String resultMessage = "You chose: " + userChoice + "\nMachine chose: " + machineChoice + "\n";
        if (userChoice.equals(machineChoice)) {
            resultMessage += "It's a Tie!";
        } else if ((userChoice.equals("Rock") && machineChoice.equals("Scissors"))
                || (userChoice.equals("Paper") && machineChoice.equals("Rock"))
                || (userChoice.equals("Scissors") && machineChoice.equals("Paper"))) {
            resultMessage += "You won!";
        } else {
            resultMessage += "Machine won!";
        }
        JOptionPane.showMessageDialog(null, resultMessage, "Result Message", JOptionPane.INFORMATION_MESSAGE);
    }

    public static void main(String args[]) {
        java.awt.EventQueue.invokeLater(() -> {
            new Game().setVisible(true);
        });
    }

    // Variables declaration - do not modify                     
    private javax.swing.JButton btnShoot;
    private javax.swing.JRadioButton jRadioBtnPaper;
    private javax.swing.JRadioButton jRadioBtnRock;
    private javax.swing.JRadioButton jRadioBtnScissors;
    private javax.swing.JLabel lblChosse;
    private javax.swing.JLabel lblTitle;
    // End of variables declaration                   
}
