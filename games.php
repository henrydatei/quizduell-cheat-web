<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Quizduell Cheat Web-GUI - Games</title>

    <link rel="stylesheet" type="text/css" href="style.css">
  </head>
  <body>
    <main>
      <div class="header">
        <h2>Quizduell Cheat - Games</h2>
      </div>

      <div class="list-of-games">
        <div class="game">
          <div class="gameID">
            GameID: 456765456789
          </div>
          <div class="yourturn">
            &nbsp;
          </div>
          <div class="opponent">
            henrydatei gegen Clemens [6:6, Runde 3]
          </div>
        </div>
      </div>

      <div class="single-game">
        <div class="overview">
          henrydatei gegen Clemens
        </div>
        <div class="buttons">
          <button type="button" name="legit">Legit-Bot</button>
          <button type="button" name="perfect-game">Perfect-Game-Bot</button>
        </div>
      </div>
      <?php
      print "hi";
        //shell_exec("./scripts/list_of_games.sh henrydatei henrydatei api");
        //shell_exec("python scripts/games.py --username=henrydatei --password=henrydatei");
        passthru("/usr/bin/python /var/www/html/stumblestore.de/ebook/quizduell/scripts/games.py --username=henrydatei --password=henrydatei", $status); // geht nicht?!
        print "<br>$status";
        print "world<br>";
        passthru("echo 'ende'"); // geht 
       ?>
    </main>
  </body>
</html>
